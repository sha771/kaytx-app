/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 *
 * Skill Brain Ingestion Hook
 *
 * Central integration point that generates a skill.md file for EVERY
 * piece of content flowing through the Company Brain ingestion pipeline.
 *
 * Every document, file, conversation message, email, meeting transcript,
 * and code commit that gets ingested automatically triggers skill extraction
 * and skill.md generation — ensuring no institutional knowledge is lost.
 *
 * This is the core solution to the 70% knowledge loss problem:
 * "When employees leave, their skills stay documented in skill.md files."
 */

import { skillBrainService } from './skill-brain-service';
import { ContentType } from '../../lib/skill-brain/types';

export interface SkillExtractionContext {
  text: string;
  contentType: ContentType;
  sourceTitle: string;
  sourcePath?: string;
  personName?: string;
  personEmail?: string;
  authorId?: string;
  departmentId?: string;
}

/**
 * Extract skills from any content and generate a skill.md file.
 *
 * Call this from EVERY ingestion path:
 * - Document processing (every chunk)
 * - Conversation messages (Slack, Teams)
 * - Emails
 * - Meeting transcripts
 * - Code commits
 * - Employee departure preservation
 *
 * @returns True if skill extraction was successful
 */
export async function extractSkillsForSkillMd(context: SkillExtractionContext): Promise<boolean> {
  try {
    const result = await skillBrainService.extractFromText(
      context.text,
      context.contentType,
      {
        sourceTitle: context.sourceTitle,
        sourcePath: context.sourcePath,
        personName: context.personName,
        personEmail: context.personEmail,
      }
    );

    if (result.success) {
      console.log(
        `[SkillBrain] ✅ skill.md generated: "${context.sourceTitle}" ` +
        `→ ${result.skillsExtracted} skills, ${result.peopleIdentified} people, ` +
        `${result.relationshipsFound} relationships (${result.duration}ms)`
      );
    } else {
      console.warn(
        `[SkillBrain] ⚠️ Partial skill extraction for "${context.sourceTitle}": ` +
        `${result.errors.join(', ')}`
      );
    }

    return result.success;
  } catch (error) {
    console.error(
      `[SkillBrain] ❌ Failed to extract skills for "${context.sourceTitle}":`,
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Extract skills from a document chunk.
 * Called by DocumentProcessorService for every chunk of every document.
 */
export async function extractSkillsFromDocumentChunk(
  text: string,
  filename: string,
  authorName?: string,
  authorEmail?: string,
  chunkIndex?: number,
  totalChunks?: number
): Promise<boolean> {
  const title = chunkIndex !== undefined
    ? `${filename} (chunk ${chunkIndex + 1}/${totalChunks || '?'})`
    : filename;

  return extractSkillsForSkillMd({
    text,
    contentType: ContentType.DOCUMENT,
    sourceTitle: title,
    sourcePath: filename,
    personName: authorName,
    personEmail: authorEmail,
  });
}

/**
 * Extract skills from a conversation message.
 * Called by IngestionService for every Slack, Teams, etc. message.
 */
export async function extractSkillsFromConversation(
  text: string,
  sourceType: string,
  channel: string,
  author: string,
  authorEmail?: string
): Promise<boolean> {
  return extractSkillsForSkillMd({
    text,
    contentType: ContentType.CONVERSATION,
    sourceTitle: `${sourceType}: ${channel}`,
    sourcePath: `${sourceType}/${channel}`,
    personName: author,
    personEmail: authorEmail,
  });
}

/**
 * Extract skills from an email.
 * Called by IngestionService for every ingested email.
 */
export async function extractSkillsFromEmail(
  text: string,
  subject: string,
  from: string,
  fromEmail?: string
): Promise<boolean> {
  return extractSkillsForSkillMd({
    text,
    contentType: ContentType.EMAIL,
    sourceTitle: `Email: ${subject}`,
    sourcePath: `email/${subject}`,
    personName: from,
    personEmail: fromEmail,
  });
}

/**
 * Extract skills from a meeting transcript.
 * Called by IngestionService for every meeting recording/transcript.
 */
export async function extractSkillsFromMeeting(
  text: string,
  meetingTitle: string,
  participants?: string[]
): Promise<boolean> {
  return extractSkillsForSkillMd({
    text,
    contentType: ContentType.MEETING,
    sourceTitle: `Meeting: ${meetingTitle}`,
    sourcePath: `meetings/${meetingTitle}`,
    personName: participants?.[0],
  });
}

/**
 * Extract skills from code.
 * Called by ingestion hooks when code commits are processed.
 */
export async function extractSkillsFromCode(
  code: string,
  language: string,
  repoPath: string,
  authorName?: string,
  authorEmail?: string
): Promise<boolean> {
  try {
    const result = await skillBrainService.extractFromCode(
      code,
      language,
      repoPath,
      authorName,
      authorEmail
    );

    if (result.success) {
      console.log(
        `[SkillBrain] ✅ skill.md generated from code: "${repoPath}" ` +
        `→ ${result.skillsExtracted} skills`
      );
    }

    return result.success;
  } catch (error) {
    console.error(
      `[SkillBrain] ❌ Failed to extract skills from code "${repoPath}":`,
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Generate skill.md files for ALL content associated with an employee
 * during departure preservation. Ensures the departing employee's skills
 * are fully captured before they leave.
 */
export async function extractSkillsForDepartingEmployee(
  employeeId: string,
  employeeName: string,
  employeeEmail?: string,
  knowledgeTexts?: string[]
): Promise<{ skillMdsCreated: number; skillsExtracted: number }> {
  let skillMdsCreated = 0;
  let skillsExtracted = 0;

  if (!knowledgeTexts || knowledgeTexts.length === 0) {
    const result = await extractSkillsForSkillMd({
      text: `Knowledge preservation for departing employee: ${employeeName} (${employeeId})`,
      contentType: ContentType.DOCUMENT,
      sourceTitle: `Departure Preservation: ${employeeName}`,
      personName: employeeName,
      personEmail: employeeEmail,
    });

    if (result) {
      skillMdsCreated++;
      const plan = skillBrainService.createTransferPlan(employeeId, employeeName);
      skillsExtracted = plan.skills.length;
    }

    return { skillMdsCreated, skillsExtracted };
  }

  for (let i = 0; i < knowledgeTexts.length; i++) {
    const result = await extractSkillsForSkillMd({
      text: knowledgeTexts[i],
      contentType: ContentType.DOCUMENT,
      sourceTitle: `Departure Knowledge ${i + 1}: ${employeeName}`,
      personName: employeeName,
      personEmail: employeeEmail,
    });

    if (result) skillMdsCreated++;
  }

  const plan = skillBrainService.createTransferPlan(employeeId, employeeName);
  skillsExtracted = plan.skills.length;

  console.log(
    `[SkillBrain] 📋 Departure preservation for ${employeeName}: ` +
    `${skillMdsCreated} skill.md files, ${skillsExtracted} skills extracted`
  );

  return { skillMdsCreated, skillsExtracted };
}

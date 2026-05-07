import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { GraduationCap, BookOpen, Play, Award, Clock, ChevronRight, Star, TrendingUp, Users, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const COURSES = [
  { id: 1, title: 'AI Agent Fundamentals', level: 'Beginner', duration: '2h 30m', rating: 4.9, students: '12.5K', progress: 0, image: '🎓' },
  { id: 2, title: 'Advanced Sales Techniques', level: 'Advanced', duration: '4h 15m', rating: 4.8, students: '8.2K', progress: 45, image: '💼' },
  { id: 3, title: 'Customer Support Excellence', level: 'Intermediate', duration: '3h 00m', rating: 4.7, students: '6.1K', progress: 0, image: '🎧' },
  { id: 4, title: 'Data Analysis with AI', level: 'Advanced', duration: '5h 30m', rating: 4.9, students: '4.8K', progress: 78, image: '📊' },
];

const MY_PROGRESS = {
  coursesCompleted: 12,
  hoursLearned: 48,
  certificates: 5,
  currentStreak: 7,
};

const CERTIFICATIONS = [
  { id: 1, name: 'AI Agent Specialist', issuer: 'KayTx Academy', date: 'Mar 2026', verified: true },
  { id: 2, name: 'Sales AI Professional', issuer: 'Sales Academy', date: 'Feb 2026', verified: true },
];

export default function TrainingIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.iconWrap, { backgroundColor: '#F59E0B20' }]}>
          <GraduationCap size={40} color="#F59E0B" />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>Training Center</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Learn to maximize your AI workforce</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <BookOpen size={20} color="#3B82F6" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{MY_PROGRESS.coursesCompleted}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Clock size={20} color="#8B5CF6" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{MY_PROGRESS.hoursLearned}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Hours</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Award size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{MY_PROGRESS.certificates}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Certificates</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Zap size={20} color="#F59E0B" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{MY_PROGRESS.currentStreak}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Day Streak</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Continue Learning</Text>
        {COURSES.filter(c => c.progress > 0).map((course) => (
          <TouchableOpacity key={course.id} style={[styles.courseCard, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.courseImage}>{course.image}</Text>
            <View style={styles.courseInfo}>
              <Text style={[styles.courseTitle, { color: theme.colors.text }]}>{course.title}</Text>
              <Text style={[styles.courseMeta, { color: theme.colors.textSecondary }]}>{course.level} • {course.duration}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: '#F59E0B' }]} />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>{course.progress}% complete</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Popular Courses</Text>
        {COURSES.filter(c => c.progress === 0).map((course) => (
          <TouchableOpacity key={course.id} style={[styles.courseCard, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.courseImage}>{course.image}</Text>
            <View style={styles.courseInfo}>
              <Text style={[styles.courseTitle, { color: theme.colors.text }]}>{course.title}</Text>
              <Text style={[styles.courseMeta, { color: theme.colors.textSecondary }]}>{course.level} • {course.duration}</Text>
              <View style={styles.courseStats}>
                <Star size={14} color="#F59E0B" />
                <Text style={[styles.rating, { color: theme.colors.text }]}>{course.rating}</Text>
                <Users size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.students, { color: theme.colors.textSecondary }]}>{course.students}</Text>
              </View>
            </View>
            <View style={[styles.playBtn, { backgroundColor: '#F59E0B' }]}>
              <Play size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>My Certificates</Text>
        {CERTIFICATIONS.map((cert) => (
          <View key={cert.id} style={[styles.certCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.certIcon, { backgroundColor: '#10B98120' }]}>
              <Award size={24} color="#10B981" />
            </View>
            <View style={styles.certInfo}>
              <Text style={[styles.certName, { color: theme.colors.text }]}>{cert.name}</Text>
              <Text style={[styles.certIssuer, { color: theme.colors.textSecondary }]}>{cert.issuer}</Text>
              <Text style={[styles.certDate, { color: theme.colors.textSecondary }]}>{cert.date}</Text>
            </View>
            {cert.verified && (
              <View style={[styles.verifiedBadge, { backgroundColor: '#10B98120' }]}>
                <Text style={[styles.verifiedText, { color: '#10B981' }]}>Verified</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <AgentFeatures agentId="training" agentName="Training Center" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, borderBottomWidth: 1 },
  iconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 6 },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  courseCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 10 },
  courseImage: { fontSize: 36, marginRight: 12 },
  courseInfo: { flex: 1 },
  courseTitle: { fontSize: 15, fontWeight: '600' },
  courseMeta: { fontSize: 12, marginTop: 2 },
  progressBar: { height: 4, backgroundColor: '#E5E5EA', borderRadius: 2, marginTop: 8 },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 11, marginTop: 4 },
  courseStats: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  rating: { fontSize: 13, fontWeight: '600' },
  students: { fontSize: 12 },
  playBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  certCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 10 },
  certIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  certInfo: { flex: 1 },
  certName: { fontSize: 15, fontWeight: '600' },
  certIssuer: { fontSize: 12, marginTop: 2 },
  certDate: { fontSize: 11, marginTop: 1 },
  verifiedBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  verifiedText: { fontSize: 11, fontWeight: '600' },
});

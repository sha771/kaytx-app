/**
 * Comprehensive Test Runner
 * Runs all test suites with proper reporting
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface TestSuite {
  name: string;
  pattern: string;
  description: string;
}

interface TestResults {
  suite: string;
  passed: number;
  failed: number;
  total: number;
  duration: number;
  coverage?: number;
}

class ComprehensiveTestRunner {
  private testSuites: TestSuite[] = [
    {
      name: 'Unit Tests',
      pattern: '__tests__/unit/**/*.test.ts',
      description: 'Individual component and service testing'
    },
    {
      name: 'Integration Tests',
      pattern: '__tests__/integration/**/*.test.ts',
      description: 'Cross-service integration testing'
    },
    {
      name: 'Property Tests',
      pattern: '__tests__/property/**/*.test.ts',
      description: 'Edge case and invariant testing with FastCheck'
    },
    {
      name: 'Security Tests',
      pattern: '__tests__/security/**/*.test.ts',
      description: 'Security vulnerability and penetration testing'
    },
    {
      name: 'Performance Tests',
      pattern: '__tests__/performance/**/*.test.ts',
      description: 'Performance, load, and stress testing'
    },
    {
      name: 'E2E Tests',
      pattern: '__tests__/e2e/**/*.test.ts',
      description: 'End-to-end user journey testing'
    }
  ];

  async runAllTests(): Promise<TestResults[]> {
    console.log('🚀 Starting Comprehensive Test Suite\n');
    
    const results: TestResults[] = [];
    
    for (const suite of this.testSuites) {
      console.log(`\n📋 Running ${suite.name}`);
      console.log(`   ${suite.description}`);
      console.log('   ' + '='.repeat(50));
      
      const result = await this.runTestSuite(suite);
      results.push(result);
      
      this.printSuiteResult(result);
    }
    
    this.printOverallResults(results);
    return results;
  }

  async runTestSuite(suite: TestSuite): Promise<TestResults> {
    const startTime = Date.now();
    
    try {
      // Run tests with coverage
      const testCommand = `npm test -- ${suite.pattern} --coverage --coverageReporters=text --coverageReporters=json`;
      const output = execSync(testCommand, { 
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Parse results from Jest output
      const parsed = this.parseTestOutput(output);
      
      // Get coverage if available
      let coverage;
      try {
        const coverageData = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
        coverage = coverageData.total?.lines?.pct || 0;
      } catch {
        coverage = undefined;
      }
      
      return {
        suite: suite.name,
        passed: parsed.passed,
        failed: parsed.failed,
        total: parsed.total,
        duration,
        coverage
      };
      
    } catch (error: any) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Parse partial results from failed test run
      const parsed = this.parseTestOutput(error.stdout || error.message);
      
      return {
        suite: suite.name,
        passed: parsed.passed,
        failed: parsed.failed || 1,
        total: parsed.total || 1,
        duration
      };
    }
  }

  private parseTestOutput(output: string): { passed: number; failed: number; total: number } {
    const lines = output.split('\n');
    let passed = 0;
    let failed = 0;
    let total = 0;

    for (const line of lines) {
      // Look for Jest test summary
      const testMatch = line.match(/Tests:\s+(\d+)\s+passed,\s+(\d+)\s+failed/);
      if (testMatch) {
        passed = parseInt(testMatch[1]);
        failed = parseInt(testMatch[2]);
        total = passed + failed;
        break;
      }

      // Alternative format
      const altMatch = line.match(/(\d+)\s+passing,\s+(\d+)\s+failing/);
      if (altMatch) {
        passed = parseInt(altMatch[1]);
        failed = parseInt(altMatch[2]);
        total = passed + failed;
        break;
      }
    }

    return { passed, failed, total };
  }

  private printSuiteResult(result: TestResults): void {
    const status = result.failed === 0 ? '✅' : '❌';
    const coverageStr = result.coverage ? ` (${result.coverage.toFixed(1)}% coverage)` : '';
    
    console.log(`   ${status} ${result.passed}/${result.total} passed${coverageStr} (${result.duration}ms)`);
    
    if (result.failed > 0) {
      console.log(`   ❌ ${result.failed} failed tests`);
    }
  }

  private printOverallResults(results: TestResults[]): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 OVERALL TEST RESULTS');
    console.log('='.repeat(60));
    
    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
    const totalTests = results.reduce((sum, r) => sum + r.total, 0);
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    const avgCoverage = results
      .filter(r => r.coverage !== undefined)
      .reduce((sum, r) => sum + (r.coverage || 0), 0) / 
      results.filter(r => r.coverage !== undefined).length;

    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${totalPassed} ✅`);
    console.log(`Failed: ${totalFailed} ${totalFailed > 0 ? '❌' : '✅'}`);
    console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
    console.log(`Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`Average Coverage: ${avgCoverage.toFixed(1)}%`);

    // Suite breakdown
    console.log('\nSuite Breakdown:');
    for (const result of results) {
      const status = result.failed === 0 ? '✅' : '❌';
      const coverageStr = result.coverage ? ` (${result.coverage.toFixed(1)}%)` : '';
      console.log(`  ${status} ${result.suite}: ${result.passed}/${result.total}${coverageStr}`);
    }

    // Recommendations
    console.log('\n📋 Recommendations:');
    if (totalFailed > 0) {
      console.log('  ❌ Fix failing tests before deployment');
    }
    if (avgCoverage < 80) {
      console.log('  ⚠️  Consider increasing test coverage (target: 80%+)');
    }
    if (totalDuration > 300000) { // 5 minutes
      console.log('  ⚠️  Consider optimizing test performance');
    }
    if (totalFailed === 0 && avgCoverage >= 80) {
      console.log('  ✅ All tests passing with good coverage - ready for deployment!');
    }
  }

  async generateTestReport(): Promise<void> {
    const results = await this.runAllTests();
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: results.reduce((sum, r) => sum + r.total, 0),
        totalPassed: results.reduce((sum, r) => sum + r.passed, 0),
        totalFailed: results.reduce((sum, r) => sum + r.failed, 0),
        totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
        averageCoverage: results
          .filter(r => r.coverage !== undefined)
          .reduce((sum, r) => sum + (r.coverage || 0), 0) / 
          results.filter(r => r.coverage !== undefined).length
      },
      suites: results
    };

    // Save report to file
    const reportPath = 'test-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed test report saved to: ${reportPath}`);
  }
}

// CLI interface
async function main() {
  const runner = new ComprehensiveTestRunner();
  
  if (process.argv.includes('--report')) {
    await runner.generateTestReport();
  } else {
    await runner.runAllTests();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { ComprehensiveTestRunner };

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
type BenchmarkResult = {
  name: string;
  average: number;
  min: number;
  max: number;
};

export class BenchmarkReporter {
  private results: BenchmarkResult[] = [];

  addResult(name: string, average: number, min: number, max: number) {
    this.results.push({ name, average, min, max });
  }

  generateReport(): string {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString();

    let report = `# Nexora Benchmark Results\n\n`;
    report += `Generated on: ${date} at ${time}\n\n`;

    report += `## Results\n\n`;
    report += `| Test Name | Average (ms) | Min (ms) | Max (ms) |\n`;
    report += `|-----------|--------------|----------|----------|\n`;

    this.results.forEach((result) => {
      report += `| ${result.name} | ${result.average.toFixed(3)} | ${result.min.toFixed(3)} | ${result.max.toFixed(3)} |\n`;
    });

    return report;
  }

  async saveToFile() {
    const report = this.generateReport();
    const reportPath = path.join(process.cwd(), 'benchmark.md');

    try {
      // Format with Prettier
      const formatted = await prettier.format(report, {
        parser: 'markdown',
        proseWrap: 'always',
      });

      // Write the formatted report
      await fs.promises.writeFile(reportPath, formatted, 'utf8');
      console.log('\n📝 Benchmark report saved to benchmark.md');
    } catch (error) {
      console.error('Error saving benchmark report:', error);
    }
  }
}

export const reporter = new BenchmarkReporter();

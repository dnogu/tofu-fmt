const core = require('@actions/core');
const { execSync } = require('child_process');

function getFlag(name, value, type = 'boolean') {
  if (type === 'boolean') {
    if (value === undefined || value === null) {
      return '';
    }
    if (value === 'true') {
      return `--${name}`;
    }
    if (value === 'false') {
      return '';
    }
    core.warning(`Unexpected value for boolean flag '${name}': ${value}`);
    return '';
  }
  if (type === 'string' && value) {
    return `--${name}=${value}`;
  }
  return '';
}

function buildTofuFmtCommand(inputs) {
  let cmdParts = ['tofu', 'fmt'];

  // Flags - add based on input values
  if (inputs.list === 'false') cmdParts.push('--list=false');
  if (inputs.write === 'false') cmdParts.push('--write=false');
  if (inputs.diff === 'true') cmdParts.push('--diff');
  if (inputs.check === 'true') cmdParts.push('--check');
  if (inputs.recursive === 'true') cmdParts.push('--recursive');

  // Add target if specified
  if (inputs.target) {
    cmdParts.push(inputs.target);
  }

  return cmdParts.join(' ');
}

async function run() {
  try {
    const workingDir = core.getInput('working-directory') || process.cwd();
    
    const inputs = {
      target: core.getInput('target'),
      list: core.getInput('list'),
      write: core.getInput('write'),
      diff: core.getInput('diff'),
      check: core.getInput('check'),
      recursive: core.getInput('recursive')
    };

    const cmd = buildTofuFmtCommand(inputs);
    core.info(`Running: ${cmd}`);

    const output = execSync(cmd, { 
      cwd: workingDir, 
      encoding: 'utf-8',
      stdio: ['inherit', 'pipe', 'pipe']
    });
    
    core.setOutput('fmt-output', output);
    
    // Check if any files needed formatting
    const needsFormatting = output.includes('.tf') || output.includes('.tfvars');
    core.setOutput('needs-formatting', needsFormatting.toString());
    
    if (needsFormatting) {
      const formattedFiles = output.split('\n').filter(line => 
        line.trim() && (line.includes('.tf') || line.includes('.tfvars'))
      );
      core.setOutput('formatted-files', formattedFiles.join('\n'));
    } else {
      core.setOutput('formatted-files', '');
    }
    
    core.info('tofu fmt completed successfully.');
  } catch (error) {
    // If check flag is used and files need formatting, exit with error
    if (core.getInput('check') === 'true') {
      core.setFailed(`tofu fmt check failed: ${error.message}`);
    } else {
      core.setFailed(error.message);
    }
  }
}

// Export functions for testing
module.exports = {
  getFlag,
  buildTofuFmtCommand,
  run
};

// Only run if this file is executed directly
if (require.main === module) {
  run();
}

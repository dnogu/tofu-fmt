# GitHub Tofu Format Action

This GitHub Action runs `tofu fmt` with all supported options, automating OpenTofu file formatting in your CI/CD workflows.

## Overview

The `tofu fmt` command is used to rewrite OpenTofu configuration files to a canonical format and style. This command applies a subset of the OpenTofu language style conventions, along with other minor adjustments for readability.

## Usage

```yaml
name: Format OpenTofu Files
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  tofu-fmt:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Format OpenTofu files
        uses: dnogu/tofu-fmt@v1
        with:
          working-directory: ./infra
          check: true
          diff: true
          recursive: true
```

## Inputs

| Name              | Description                                                                 | Default      |
|-------------------|-----------------------------------------------------------------------------|-------------|
| working-directory | The directory in which to run tofu fmt.                                    | `.`         |
| target            | Target files or directories to format. If not specified, formats current directory. | `''`        |
| list              | List files with formatting inconsistencies (--list=true\|false).           | `true`      |
| write             | Write result to source file instead of stdout (--write=true\|false).       | `true`      |
| diff              | Display diff of formatting changes (--diff).                               | `false`     |
| check             | Check if input is formatted (--check). Exit status non-zero if not formatted. | `false`     |
| recursive         | Also process files in subdirectories (--recursive).                        | `false`     |

## Outputs

| Name             | Description                                      |
|------------------|--------------------------------------------------|
| fmt-output       | The output from tofu fmt.                        |
| needs-formatting | Boolean indicating if any files needed formatting. |
| formatted-files  | List of files that were formatted or need formatting. |

## Examples

### Basic formatting check
```yaml
steps:
  - name: Check OpenTofu formatting
    uses: dnogu/github-tofu-fmt@v1
    with:
      working-directory: ./terraform
      check: true
      diff: true
      recursive: true
```

### Format files with diff output
```yaml
steps:
  - name: Format OpenTofu files
    uses: dnogu/github-tofu-fmt@v1
    with:
      working-directory: ./infra
      write: true
      diff: true
      recursive: true
```

### Check specific files
```yaml
steps:
  - name: Check specific files
    uses: dnogu/github-tofu-fmt@v1
    with:
      target: "main.tf variables.tf"
      check: true
      diff: true
```

### Format and commit changes
```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4
    
  - name: Format OpenTofu files
    uses: dnogu/github-tofu-fmt@v1
    id: fmt
    with:
      working-directory: ./infra
      write: true
      diff: true
      recursive: true
      
  - name: Commit formatted files
    if: steps.fmt.outputs.needs-formatting == 'true'
    run: |
      git config --local user.email "action@github.com"
      git config --local user.name "GitHub Action"
      git add .
      git commit -m "Auto-format OpenTofu files"
      git push
```

## Command Reference

This action uses the `tofu fmt` command with the following options:

- `--list=false` - Don't list files containing formatting inconsistencies
- `--write=false` - Don't overwrite input files (implied by `--check` or when input is STDIN)
- `--diff` - Display diffs of formatting changes
- `--check` - Check if input is formatted. Exit status non-zero if not formatted
- `--recursive` - Also process files in subdirectories

## OpenTofu fmt Documentation

For more information about the `tofu fmt` command, see the [official OpenTofu documentation](https://opentofu.org/docs/cli/commands/fmt/).

### Usage Patterns

The `tofu fmt` command can be used in several ways:

```bash
# Format current directory
tofu fmt

# Format specific files
tofu fmt main.tf variables.tf

# Format directory recursively
tofu fmt -recursive .

# Check formatting without changing files
tofu fmt -check

# Show diff of what would change
tofu fmt -diff

# Format but don't list changed files
tofu fmt -list=false
```

## Best Practices

1. **Use in CI/CD**: Add this action to your CI/CD pipeline to ensure consistent formatting
2. **Check mode**: Use `check: true` in pull requests to validate formatting without modifying files
3. **Recursive processing**: Use `recursive: true` to format all files in subdirectories
4. **Show diffs**: Use `diff: true` to see exactly what formatting changes would be made
5. **Combine with validation**: Use alongside tofu validate and plan actions for comprehensive checks

## Error Handling

- When `check: true` is used, the action will fail if any files need formatting
- The action provides detailed output about which files need formatting
- Use the `needs-formatting` output to conditionally run subsequent steps

## Integration Examples

### With terraform-docs
```yaml
steps:
  - name: Format OpenTofu files
    uses: dnogu/github-tofu-fmt@v1
    with:
      write: true
      recursive: true
      
  - name: Generate docs
    uses: terraform-docs/gh-actions@main
    with:
      working-dir: .
      output-file: README.md
```

### With tflint
```yaml
steps:
  - name: Format OpenTofu files
    uses: dnogu/github-tofu-fmt@v1
    with:
      check: true
      recursive: true
      
  - name: Run TFLint
    uses: reviewdog/action-tflint@master
    with:
      github_token: ${{ secrets.github_token }}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

- dnogu

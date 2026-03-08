# Installation

## Prerequisites

- **Node.js 20.19.0 or higher** — Check your version: `node --version`

## Package Managers

### npm

```bash
npm install -g @seanf-ai/openspecpowers@latest
```

### One-Command Installer

If this repository is hosted on GitHub, users can install with one command:

```bash
curl -fsSL https://raw.githubusercontent.com/seanf-ai/OpenSpecPowers/main/scripts/install-openspowers.sh | bash -s -- --prefix "$HOME/.local"
```

Optional project bootstrap in the same command:

```bash
curl -fsSL https://raw.githubusercontent.com/seanf-ai/OpenSpecPowers/main/scripts/install-openspowers.sh | bash -s -- --prefix "$HOME/.local" --init "$PWD"
```

### pnpm

```bash
pnpm add -g @seanf-ai/openspecpowers@latest
```

### yarn

```bash
yarn global add @seanf-ai/openspecpowers@latest
```

### bun

```bash
bun add -g @seanf-ai/openspecpowers@latest
```

## Nix

Run OpenSpecPowers directly without installation:

```bash
nix run github:seanf-ai/OpenSpecPowers -- init
```

Or install to your profile:

```bash
nix profile install github:seanf-ai/OpenSpecPowers
```

Or add to your development environment in `flake.nix`:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    openspecpowers.url = "github:seanf-ai/OpenSpecPowers";
  };

  outputs = { nixpkgs, openspecpowers, ... }: {
    devShells.x86_64-linux.default = nixpkgs.legacyPackages.x86_64-linux.mkShell {
      buildInputs = [ openspecpowers.packages.x86_64-linux.default ];
    };
  };
}
```

## Verify Installation

```bash
openspecpowers --version
```

## Next Steps

After installing, initialize OpenSpecPowers in your project:

```bash
cd your-project
openspecpowers init
```

See [Getting Started](getting-started.md) for a full walkthrough.

## Share to Other Devices Before npm Publish

If you have not published to npm yet, distribute a tarball:

```bash
# On source machine
cd OpenSpecPowers
npm pack

# Copy the generated *.tgz to target machine, then install:
npm install -g ./fission-ai-openspecpowers-<version>.tgz
```

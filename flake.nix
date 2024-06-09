{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages.default = pkgs.mkYarnPackage {
          name = "bob-website";
          src = ./.;
          buildPhase = ''yarn --offline run build'';
          installPhase = ''mv deps/bob-website/dist $out'';
          distPhase = "true";
        };
      }
    );
}

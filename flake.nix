{
  description = "Hyprland Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "hyprshell";
        entry = "app.ts";

        # additional libraries and executables to add to gjs' runtime
        extraPackages = [
          ags.packages.${system}.battery
          ags.packages.${system}.network
          ags.packages.${system}.wireplumber
          ags.packages.${system}.hyprland
          ags.packages.${system}.tray
          pkgs.gettext
        ];
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          # includes all Astal libraries
          ags.packages.${system}.agsFull

          # includes astal3 astal4 astal-io by default
          #(ags.packages.${system}.default.override {
          #  extraPackages = [
          #    # cherry pick packages
          #  ];
          #})
        ];
      };
    };
  };
}

{
  description = "Hyprland Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
    astal,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      default = pkgs.stdenv.mkDerivation {
        name = "hyprshell";
        src = ./.;

        nativeBuildInputs = with pkgs; [
          meson
          ninja
          gobject-introspection
          wrapGAppsHook
          ags.packages.${system}.ags
        ];

        buildInputs =
        (with astal.packages.${system}; [
          astal3
          io
          apps
          battery
          bluetooth
          hyprland
          mpris
          network
          notifd
          powerprofiles
          tray
          wireplumber
        ])
        ++ (with pkgs; [
          gjs
        ]);

        postInstall = ''
          chmod +x $out/bin/$name
          
          if ! head -n 1 "$out/bin/$name" | grep -q "^#!"; then
            sed -i '1i #!${pkgs.gjs}/bin/gjs -m' "$out/bin/$name"
          fi
        '';
      };
    };
  };
}

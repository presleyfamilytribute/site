{ pkgs }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.yarn
  ];
}
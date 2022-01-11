let
  pkgs = import <nixpkgs> { };
in pkgs.mkShell {
  buildInputs = with pkgs; [ nodejs yarn ];
  shellHook = ''
      mkdir -p .nix-node
      export NPM_CONFIG_PREFIX=$PWD/.nix-node
      export NODE_PATH=$PWD/.nix-node
      export PATH=$NODE_PATH/bin:$PATH
      export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}

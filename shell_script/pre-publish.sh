# clean build
rm -rf ./lib || true
rm -rf ./types || true
rm -rf ./node_modules || true
rm ./index.js || true
rm ./package-lock.json || true
npm install
tsc

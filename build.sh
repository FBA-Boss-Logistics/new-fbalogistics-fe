# exit code 1 if any script execution fails
set -e

# remove all .env* files for root directory
find . -maxdepth 1 -type f -name ".env*" -exec rm {} \;

# copy env file according to the environment
case $1 in
  local)
    cp env/.env.local .
    mv .env.local .env
    echo "using env/.env.local for local"
    ;;
  dev)
    cp env/.env.development .
    mv .env.development .env
    echo "using env/.env.development for dev"
    ;;

  stage)
    cp env/.env.test .
    mv .env.test .env
    echo "using env/.env.test for stage"
    ;;

  prod)
    cp env/.env.production .
    mv .env.production .env
    echo "using env/.env.production for prod"
    ;;
  *)
    echo "unknown env variable"
    exit 1
    ;;
esac

# building the React.js application
npm run build
#!/bin/sh

if [[ -x yarn ]]; then
  export PACKAGE_CMD=yarn
else
  export PACKAGE_CMD=npm
fi

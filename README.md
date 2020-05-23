## rest-deno

A simple example how to make an REST API CRUD in Deno

1. Clone the repo
2. You must have Deno 1.0 version or superior.

### Using Deno:

```sh
deno upgrade --version 1.0.2
```

### With Shell:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.2
```

### With PowerShell:

```sh
iwr https://deno.land/x/install/install.ps1 -useb -outf install.ps1; .\install.ps1 v1.0.2
```

3. Run the `./apis/index.ts` file.

You will have to add the permission for `net` use adding `--allow-net` flag.

You will have to add the permission for `env` use adding `--allow-env` flag.

```sh
$ deno run --allow-env --allow-net ./api/index.ts
```

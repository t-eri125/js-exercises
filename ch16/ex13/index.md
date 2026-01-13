# Linux
> echo HELLO | tr [:upper:] [:lower:] > hello.txt

# Windows (WSL が必要)
> wsl echo HELLO | wsl tr [:upper:] [:lower:] > hello.txt

# いずれも hello.txt に `hello` と書き込まれる

# Windows (WSL 不要)
# 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
> cmd /c dir | cmd /c "findstr DIR"
```Powershell
2026/01/3  22:31    <DIR>          .
2026/01/2  16:25    <DIR>          ..
```

Powershell からは直接実行できないものを実行するため。
Windows では、実行ファイルと cmd の組み込みコマンドの2種類が存在する。
Powershell では実行ファイルしか実行できないため、今回の `dir` は直接起動できず、cmd.exe を起動してその中で実行し、最後にプロンプトを閉じている。

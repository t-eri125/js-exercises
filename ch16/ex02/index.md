# 問題 16.2 💻🖋️

## index.js は一定確率で終了する子プロセスを spawn するようになっている。index.js に対して以下の処理を実装しなさい。

1. 子プロセスが異常終了した場合、再起動する
2. シグナルを 2 種類以上トラップし、そのシグナルと同じシグナルを子プロセスに通知し、子プロセスがそのシグナルによって終了したことを確認し、自身も終了する

```
SIGINT：ctrl+C
SIGTERM：別のターミナルから　taskkill /PID <PID>　をする　→　でも駄目だった
```

## また、主にクラウド上で動作するプログラムは、いわゆる Graceful Shutdown という動作が求められ、上記のような処理が必要な場合がある。Kubernetes や Amazon ECS などの Docker ランタイム上でコンテナの Graceful Shutdown のために送信されるシグナルの種類は何か書きなさい。

基本は共通で SIGTERM →（猶予期間）→ SIGKILL

### Kubernetes
SIGTERM（ただし、コンテナイメージで STOPSIGNAL が指定されている場合はそのシグナル。猶予期間後には SIGKILL）
```
Many container runtimes respect the STOPSIGNAL value defined in the container image and, if different, send the container image configured STOPSIGNAL instead of TERM.
```
[Termination of Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)

### Amazon ECS
SIGTERM（ただし、stopTimeout（デフォルトは30秒）経過時には SIGKILL）
[コンテナのライフサイクル](https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/#:~:text=%E3%81%A8%E6%80%9D%E3%81%84%E3%81%BE%E3%81%99%E3%80%82-,%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB,-ECS%20%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88%E3%81%AF)

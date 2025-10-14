javascript: (() => {
  const templates = [
    {
      label: "議事録",
      text: `
      議事録を作成してください。以下の指示に従って出力してください。

      ## 会議の情報
      日時： << 20xx年xx月xx日 xx:xx～xx:xx >>
      場所： << Zoom会議 >>  
      参加者： << ○○、△△、□□、×× >>
      議題： << 新機能リリースに向けた進捗確認 >>
      会議内容：アップロードした文字起こしファイルを参照してください

      ## 議事録に含める内容
      各参加者の主な発言（発言者名と発言内容を明確に分ける）
      出されたアイデア（出された順番ごとに記載する）
      決定事項（目立つように太字にする）
      ネクストアクション（担当者と期日を含める）

      ## 出力形式
      ・日時／場所／参加者／議題の順で構成する
      ・本文は内容ごとに小見出しを設け、箇条書きで整理する
      ・表記の揺れを避け、整然とした構成とする

      ## 文体・表現ルール
      ・敬称は省略する
      ・専門用語は避け、誰でも理解しやすい表現を使用する
      ・感情的な表現は避け、事実のみに基づいて記述する
      ・全体として簡潔かつ論理的な文体でまとめる

      (出典：https://www.ricoh.co.jp/magazines/column/trn-meeting-minutes-prompt/)
      `
    },
    {
      label: "コード例",
      text: `
      【プロンプト例】
      以下の条件に従い、XXXを実行するためのコードを作成してください。
      
      ###目的
      XXXができるコードを作成したい
      
      ###条件
      ・利用するプログラミング言語：Python
      ・必要な機能：XXX、XXX、XXX
      ・XXX" 

      （出典：https://metaversesouken.com/ai/chatgpt/code-generation-2/#Step_2）
      `
    }
  ];

  // 選択肢を表示して番号を入力
  const choice = prompt(
    templates.map((t, i) => `${i + 1}：${t.label}`).join("\n")
  );

  // 入力を配列のインデックスに変換
  const index = Number(choice) - 1;

  // 編集したい箇所を取得
  const target = document.querySelector('[contenteditable="true"]');

  if (!target) return alert("contenteditable=true な要素が見つかりません");

  // 新規入力欄があれば、選択した内容を入力してフォーカスを当てる
  if (templates[index]) {
    target.innerHTML = templates[index].text;
    target.dispatchEvent(new InputEvent("input", { bubbles: true }));  // ユーザー入力として反映
    target.focus();
  }
})();

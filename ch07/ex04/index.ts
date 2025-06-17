// 以下のデータを使い、下記の各値を求めなさい。
// ただし、配列イテレータメソッドを利用し、ループ文(for, while)を使わないこと。

const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const sumMath = data.reduce((total, person) => total + person.math, 0);
console.log(sumMath);   // -> 530

// クラスAのchemistryの平均点
// クラスAに絞る　→　sumMath同様に加算する　→　フィルターした配列の長さで割る
const classA = data.filter(person => person.class === "A")
const totalChemistry = classA.reduce((total, person) => total + person.chemistry, 0);
const averageClassAChemistry = totalChemistry / classA.length; // 人数で割って平均
console.log(averageClassAChemistry);  // -> 45

// 3科目合計点のクラスC内での平均点
// クラスCに絞る　→　合計値でマッピングする　→　フィルターした配列の長さで割る
const classC = data.filter(person => person.class === "C")
const mapClassCTotalSubject = classC.map(person => person.math + person.chemistry + person.geography);
const totalClassCSubject = mapClassCTotalSubject.reduce((total, person) => total + person, 0);
const averageClassCSubject = totalClassCSubject / classC.length; // 人数で割って平均
console.log(averageClassCSubject);  // -> 176.66666666666666

// 3科目合計点が最も高い人のname
// 名前と合計の配列をマッピング　→　合計点が最の名前を返す
const mapTotalSubject = data
    .map(person => ({
        name: person.name,
        total: person.math + person.chemistry + person.geography
    })); const maxTotalPerson = mapTotalSubject.reduce((max, person) => person.total > max.total ? person : max, mapTotalSubject[0]).name;

console.log(maxTotalPerson);  // -> Frank

// 全体のgeographyの標準偏差
// geography の点数だけマッピング　→　平均値を求める
const geographyScores = data.map(student => student.geography);
const totalGeo = geographyScores.reduce((sum, score) => sum + score, 0);
const avetageGeo = totalGeo / geographyScores.length;

// 分散を求める（各スコアと平均の差の二乗の平均）
const squaredDifferences = geographyScores.map(score => Math.pow(score - avetageGeo, 2))   // 差の2乗を配列に
const sumSquaredDifferences = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0);
const variance = sumSquaredDifferences / squaredDifferences.length;

// 標準偏差（√分散）を求める 
const standardDeviation = Math.sqrt(variance);

console.log(standardDeviation); // => 22.3330569358242

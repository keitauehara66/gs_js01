// 竜王の手をシャッフル
const array = [
    '<img src="img/guu2.png" alt="竜王のグー" value="0">',
    '<img src="img/choki2.png" alt="竜王のチョキ" value="1">',
    '<img src="img/paa2.png" alt="竜王のパー" value="2">'
]
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let shuffleId;
const changeImg = () => {
    shuffleId = setInterval(function(){
      for(let bun2 of shuffle(array)){//シャッフル後の配列の要素繰り返し
          $('.btn-e').html(bun2); 
      }
    }, 80);
}
// 参考リンク
// https://note.com/side7/n/nbada3446d7fc


// たたかうを選択すると勇者の手が登場
$(".resetbtn").on("click",function(){
    $(".btn").css("visibility","visible");
    $(".yusha").css("visibility","visible");
    $(".yusha").children("img").attr("src","img/yusha.png")
    $(".endingmovie").css("visibility","hidden");
    $(".memo-base").css("visibility","visible")
    $(".memo-draw").css("visibility","hidden")
    $(".memo-lose").css("visibility","hidden")
    $(".memo-win1").css("visibility","hidden")
    $(".memo-win2").css("visibility","hidden")    
});

// たたかうを選択すると竜王の手が動き出す
$(".resetbtn").on("click",function(){
    changeImg();
    $(".ryuou1").css("visibility","visible")
    $(".ryuou2").css("visibility","hidden")
    $(".btn-e").css("visibility","visible");
    $(".guu-e").css("visibility","hidden");
    $(".choki-e").css("visibility","hidden");
    $(".paa-e").css("visibility","hidden");
});

// 勇者が手を出したらシャッフルが止まり竜王の手が決まる
$(".btn").on("click",function(){        
    clearInterval(shuffleId);
    $(".btn-e").css("visibility","visible");
});

// エンディングムービー
$(function () {
    $('.endingmovie').hide(0);
});
function ob(id) {
    id.show('slow');
    $(".endingmovie").css("visibility","visible");
}

// じゃんけんの分岐
function rsp(yushaSelect) {
    let ryuouSelect = Math.floor(Math.random() *3);
    let result;
    let ryuoustatus = $(".ryuou2").css("visibility");
    console.log(ryuoustatus);
    console.log(yushaSelect);
    console.log(ryuouSelect);

    if (yushaSelect == ryuouSelect) {
        // 一緒だったらあいこ
        result = 2;
    } else {
        // 勝敗条件
        if (yushaSelect == 0) {
            // 勇者はグー
            if (ryuouSelect == 1) {
                // 竜王はチョキ
                result = 1;
            } else {
                // 竜王はパー
                result = 0;
            }
        } else if (yushaSelect == 1) {
            // 勇者はチョキ
            if (ryuouSelect == 0) {
                // 竜王はグー
                result = 0;
            } else {
                // 竜王はパー
                result = 1;
            }
        } else {
            // 勇者はパー
            if (ryuouSelect == 0) {
                // 竜王はグー
                result = 1;
            } else {
                // 竜王はチョキ
                result = 0;
            }
        }
    }
    console.log(result);
    // resultコード
    // 0:負け
    // 1:勝ち
    // 2:あいこ

    // 竜王の手の画像を乱数の結果に合わせて表示
    if (ryuouSelect == 0){
        $(".guu-e").css("visibility","visible")
    }else if (ryuouSelect == 1){
        $(".choki-e").css("visibility","visible")
    }else{
        $(".paa-e").css("visibility","visible")
    }

    // 勝敗に応じて表示メッセージを変更
    if (result == 2){
        $(".memo-base").css("visibility","hidden")
        $(".memo-draw").css("visibility","visible")
        $(".memo-lose").css("visibility","hidden")
        $(".memo-win1").css("visibility","hidden")
        $(".memo-win2").css("visibility","hidden")
        changeImg()
        $(".btn-e").css("visibility","visible")
        $(".guu-e").css("visibility","hidden")
        $(".choki-e").css("visibility","hidden")
        $(".paa-e").css("visibility","hidden")
    }else if(result == 0){
        $(".memo-base").css("visibility","hidden")
        $(".memo-draw").css("visibility","hidden")
        $(".memo-lose").css("visibility","visible")
        $(".memo-win1").css("visibility","hidden")
        $(".memo-win2").css("visibility","hidden")
        $(".btn").css("visibility","hidden")
        $(".yusha").children("img").attr("src","img/kanoke.png")
    }else if(result == 1 && ryuoustatus == "hidden"){
        $(".memo-base").css("visibility","hidden")
        $(".memo-draw").css("visibility","hidden")
        $(".memo-lose").css("visibility","hidden")
        $(".memo-win1").css("visibility","visible")
        $(".memo-win2").css("visibility","hidden")
        $(".ryuou1").css("visibility","hidden")
        $(".ryuou2").css("visibility","visible")
        changeImg();
        $(".btn-e").css("visibility","visible")
        $(".guu-e").css("visibility","hidden")
        $(".choki-e").css("visibility","hidden")
        $(".paa-e").css("visibility","hidden")
    }else if(result == 1 && ryuoustatus == "visible"){
        $(".memo-base").css("visibility","hidden")
        $(".memo-draw").css("visibility","hidden")
        $(".memo-lose").css("visibility","hidden")
        $(".memo-win1").css("visibility","hidden")
        $(".memo-win2").css("visibility","visible")
        $(".ryuou1").css("visibility","hidden")
        $(".ryuou2").css("visibility","hidden")
        $(".btn-e").css("visibility","hidden")
        $(".guu-e").css("visibility","hidden")
        $(".choki-e").css("visibility","hidden")
        $(".paa-e").css("visibility","hidden")
        $(".btn").css("visibility","hidden")
        $(".resetbtn").css("visibility","hidden")
        setTimeout("ob($('.endingmovie'))", 500);
    }
}
// 参考リンク
// https://kent-and-co.gitbook.io/first-step-js/hanzuon/jankenshitemiyou

// 最後ジャンケン2連勝の条件文で詰まった。
// css内のvisivilityの属性値を直接条件文に入れてやろうとしたがうまく動かず、
// 最終的には先にvisibilityの属性値を変数として宣言しておくことで解消した。
// 毎回上から下まで一気に読み込まれるため、段階的に読み込む設定を入れたくなったが、
// その際はトリガーになる要素を変数として宣言しておいてそれを条件に加えれば良いと学んだ。



$( () => {
  const GAME_LIMIT = 10;
  const DIFFICULTY_BUTTONS = $(".difficulty-button")
  let currentWord;
  let pastWords = [];
  let currentAnswer;
  let difficulty;
  let userScore;
  let prevScore = {score: "", difficulty: ""};
  let questionsAnswered;
  
  function Word(kanji, reading, romaji, meaning, type) {
    this.kanji = kanji,
    this.reading = reading,
    this.romaji = romaji,
    this.meaning = meaning,
    this.type = type
  }

  //for stuff like this you wish you had an API
  let words = [
    suteki = new Word("素敵", "すてき", "suteki", "wonderful", "adjective"),
    taberu = new Word("食べる", "たべる", "taberu", "to eat", "verb"),
    kokorozashi = new Word("志", "こころざし", "kokorozashi", "ambition", "noun"),
    myoujou = new Word("明星", "みょうじょう", "myoujou", "venus", "noun"),
    jouzu = new Word("上手", "じょうず", "jouzu", "skilled", "adjective"),
    wakaranai = new Word("分からない", "わからない", "wakaranai", "to not understand", "verb"),
    owari = new Word("終り", "をわり", "owari", "end", "noun"),
    ui = new Word("有為", "うゐ", "ui", "vicissitude", "noun"),
    ehi = new Word("酔ひ", "ゑひ", "ehi", "inebriation", "noun"),
    yami = new Word("闇", "やみ", "yami", "darkness", "noun"),
    yuragi = new Word("揺らぎ", "ゆらぎ", "yuragi", "shaking", "noun"),
    yomigaeru = new Word("蘇る", "よみがえる", "yomigaeru", "to resurrect", "verb"),
    oomono = new Word("大物", "おおもの", "oomono", "important figure", "noun"),
    keitou = new Word("系統", "けいとう", "keitou", "system", "noun"),
    sekai = new Word("世界", "せかい", "sekai", "world", "noun"),
    sabishii = new Word("寂しい", "さびしい", "sabishii", "sad", "adjective"),
    suteru = new Word("捨てる", "すてる", "suteru", "to throw away", "verb"),
    tamerau = new Word("躊躇う", "ためらう", "tamerau", "to hestitate", "verb"),
    chikara = new Word("力", "ちから", "chikara", "power", "noun"),
    tsutsumotase = new Word("美人局", "つつもたせ", "tsutsumotase", "badger game", "noun"),
    naigashiro = new Word("蔑ろ", "ないがしろ", "naigashiro", "to neglect", "verb"),
    nuigurumi = new Word("縫いぐるみ", "ぬいぐるみ", "nuigurumi", "stuffed toy", "noun"),
    neesan = new Word("姉さん", "ねえさん", "neesan", "sister", "noun"),
    nokoru = new Word("残る", "のこる", "nokoru", "to remain", "verb"),
    fude = new Word("筆", "ふで", "fude", "brush", "noun"),
    hekomi = new Word("凹み", "へこみ", "hekomi", "indentation", "noun"),
    pakuri = new Word("パクリ", "ぱくり", "pakuri", "plagiarism", "noun"),
    ponzu = new Word("ポン酢", "ぽんず", "ponzu", "citrus sauce", "noun"),
    baka = new Word("バカ", "ばか", "baka", "idiot", "noun"),
    bouryoku = new Word("暴力", "ぼうりょく", "bouryoku", "violence", "noun"),
    yume = new Word("夢", "ゆめ", "yume", "dream", "noun"),
    kanpuku = new Word("感服", "かんぷく", "kanpuku", "admiration", "noun"),
    piiman = new Word("ピーマン", "ぴーまん", "piiman", "bell pepper", "noun"),
    kattou = new Word("葛藤", "かっとう", "kattou", "troubles", "noun"),
    petto = new Word("ペット", "ぺっと", "petto", "pet", "noun"),
    giman = new Word("欺瞞", "ぎまん", "giman", "deceit", "noun"),
    mukui = new Word("報い", "むくい", "mukui", "retribution", "noun"),
    jibun = new Word("自分", "じぶん", "jibun", "oneself", "noun"),
    bicchi = new Word("ビッチ", "びっち", "bicchi", "slut", "noun"),
    bentou = new Word("弁当", "べんとう", "bentou", "lunchbox", "noun"),
    zouin = new Word("増員", "ぞういん", "zouin", "personnel increase", "noun"),
    genzai = new Word("現在", "げんざい", "genzai", "present", "noun"),
    guntai = new Word("軍隊", "ぐんたい", "guntai", "military", "noun"),
    sango = new Word("珊瑚", "さんご", "sango", "coral", "noun"),
    kiken = new Word("危険", "きけん", "kiken", "dangerous", "adjective"),
    futsuu = new Word("普通", "ふつう", "futsuu", "normal", "adjective"),
    jijuu = new Word("自由", "じゆう", "jijuu", "free", "adjective"),
    tokubetsu = new Word("特別", "とくべつ", "tokubetsu", "special", "adjective"),
    byoudou = new Word("平等", "びょうどう", "byoudou", "equal", "adjective"),
    kenkou = new Word("健康", "けんこう", "kenkou", "healthy", "adjective"),
    shizen = new Word("自然", "しぜん", "shizen", "natural", "adjective"),
    tomurau = new Word("弔う", "とむらう", "tomurau", "to mourn", "verb"),
    tatakau= new Word("戦う", "たたかう", "tatakau", "to fight", "verb"),
    semegiau = new Word("鬩ぎ合う", "せめぎあう", "semegiau", "to quarrel", "verb"),
    kaku = new Word("書く", "かく", "kaku", "to write", "verb"),
    kakeru = new Word("欠ける", "かける", "kakeru", "to lack", "verb"),
    haku = new Word("吐く", "はく", "haku", "to spew", "verb"),
    isogu = new Word("急ぐ", "いそぐ", "isogu", "to hurry", "verb"),
    aoru = new Word("煽る", "あおる", "aoru", "to fan", "verb"),
    nuku = new Word("抜く", "ぬく", "nuku", "to pull out", "verb"),
    megumu = new Word("恵む", "めぐむ", "megumu", "to bless", "verb"),
    sasu = new Word("刺す", "さす", "sasu", "to stab", "verb"),
    kuruu = new Word("狂う", "くるう", "kuruu", "to madden", "verb"),
    shinu = new Word("死ぬ", "しぬ", "shinu", "to die", "verb"),
    asobu = new Word("遊ぶ", "あそぶ", "asobu", "to play", "verb"),
    wakai = new Word("若い", "わかい", "wakai", "young", "adjective"),
    osanai = new Word("幼い", "おさない", "osanai", "childlike", "adjective"),
    tanoshii = new Word("楽しい", "たのしい", "tanoshii", "fun", "adjective"),
    nurui = new Word("温い", "ぬるい", "nurui", "wet", "adjective"),
    katai = new Word("固い", "かたい", "katai", "hard", "adjective"),
    kashikoi = new Word("賢い", "かしこい", "kashikoi", "clever", "adjective"),
    shibui = new Word("渋い", "しぶい", "shibui", "bitter", "adjective"),
    suppai = new Word("酸っぱい", "すっぱい", "suppai", "sour", "adjective"),
    amai = new Word("甘い", "あまい", "amai", "sweet", "adjective"),
    karai = new Word("辛い", "からい", "karai", "spicy", "adjective"),
  ];

  const randomNumberGenerator = (numerator) => {
    return Math.floor(Math.random() * numerator);
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length
    while (currentIndex != 0) {
      let randomIndex = randomNumberGenerator(currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = 
      [array[randomIndex], array[currentIndex]];
    }
  }

  const resetWordArray = () => {
    if (pastWords.length === 0) {
      return;
    }
    pastWords.forEach((item) => {
      words.push(item);
    });
    pastWords = [];
  };

  const initializeGame = () => {
    difficulty = "not selected";
    userScore = 0;
    $(".score-tab p").text("00")
    questionsAnswered = 0;
    resetWordArray();
    $(".introduction__message--tries").text(`${GAME_LIMIT}`);
    $(".start-game__button").prop("disabled", true);
    $(".start-screen").css("display", "flex");
    $(".play-field").hide();
    $(".game-over").hide();
    $(".help__content").hide();
  }
  initializeGame();

  const unselectDiffcultyButtons = () => {
    $(DIFFICULTY_BUTTONS).each((index, otherButton) => {
      $(otherButton).removeClass("selected")
    })
  }

  const selectDifficulty = () => {
    $(DIFFICULTY_BUTTONS).each((index, button) => {
      let buttonText = $(button).text();
      $(button).on({
        "click": () => {
          difficulty = buttonText.toLowerCase()
          unselectDiffcultyButtons();
          $(button).addClass("selected")
          $(".start-game__button").prop("disabled", false)
        },
        "mouseover": () => {
          $(button).addClass("hover")
          if (prevScore.difficulty === buttonText.toLowerCase()) {
            $(button).text(`Previous score: ${prevScore.score}/${GAME_LIMIT}`)
          }
        },
        "mouseleave": () => {
          $(button).removeClass("hover")
          $(button).text(`${buttonText}`)
        }
      })
    })
  }
  selectDifficulty()

  const selectWord = () => {
    let randomNumber = randomNumberGenerator(words.length);
    currentWord = words[randomNumber];
    words.splice(randomNumber, 1);
    pastWords.push(currentWord);
    currentAnswer = currentWord.romaji
  };

  const displayWord = () => {
    selectWord()
    if (difficulty === "normal") {
      $(".question__character").text(currentWord.reading);
    } else {
      $(".question__character").text(currentWord.kanji);
    }
  };

  const selectAnswerOptions = (type) => {
    let options = []
    for (let i = 0; i < 3; i++) {
      if (type === "regular") {
        let randomNumber = randomNumberGenerator(words.length)
        if (words[randomNumber].romaji === options[1] || words[randomNumber].romaji === options[2]) {
          i =- 1
        } else {
          options[i] = words[randomNumber].romaji
        }
        options[3] = currentAnswer;
      } else if (type === "extra") {
        let relatedWords = [];
        $(words).each((index, word) => {
          if (word.type === currentWord.type) {
            relatedWords = relatedWords.concat(word.meaning)
          }
        })
        let randomNumber = randomNumberGenerator(relatedWords.length)
        if (relatedWords[randomNumber] === options[1] || relatedWords[randomNumber] === options[2]) {
          i =- 1
        } else {  
          options[i] = relatedWords[randomNumber]
        }
        options[3] = currentAnswer;
      }
    }
    //the array needs to be shuffled, otherwise 
    //the right answer is always the last one.
    shuffleArray(options)
    return options;
  }

  const displayAnswerOptions = (type) => {
    options = selectAnswerOptions(type);
    $(".answer__cell").each((index, cell) => {
      $(cell).text(options[index])
    })
  }

  const displayNewQuestion = () => {
    displayWord();
    $(".question__character").show();
    $(".question__meaning").hide();
    displayAnswerOptions("regular");
  }

  const displayExtraQuestion = () => {
    $(".question__character").hide();
    $(".question__meaning").text(`What does ${currentWord.kanji} mean?`)
    $(".question__meaning").show();
    displayAnswerOptions("extra");
  }

  const startGame = () => {
    $(".start-game__button").on("click", () => {
      $(".start-screen").hide();
      $(".play-field").css('display', 'flex');
      displayNewQuestion();
      unselectDiffcultyButtons();
    })
  }
  startGame();

  const evaluateAnswer = (answer) => {
    if (answer === currentAnswer) {
      return true;
    } else {
      return false;
    }
  }

  const displayGameOverScreen = () => {
    $(".game-over").show()
    let message = $(".game-over__message");
    if (userScore === GAME_LIMIT) {
      $(".game-over__title").text("VICTORY!")
      if (difficulty === "normal") {
        message.text(`You scored a perfect game! Wow, you must really know your kanas by now! Play again and see if you can beat a harder difficulty!`)
      } else if (difficulty === "hard") {
        message.text(`You scored a perfect game! Your kanji skills are really up there! This is no easy task, you know! Perhaps you can also beat very hard? Give it a try!`)
      } else if (difficulty === "very hard") {
        message.text(`You scored a perfect game! Incredible, this game cannot challenge you any more. If you still find it fun, you could maybe consider playing again anyway?`)
      }
    } else {
      message.text(`You scored ${userScore} points out of a total possible ${GAME_LIMIT} points. Play again and try to get a perfect score!`)
    }
  }

  const addScore = () => {
    userScore++
    let displayedScore
    if (userScore < 10) {
      displayedScore = "0" + userScore;
    } else {
      displayedScore = userScore;
    }
    $(".score-tab p").text(displayedScore)
  }

  const continueGameLoop = () => {
    questionsAnswered++
    if (questionsAnswered < GAME_LIMIT) {
      displayNewQuestion();
    } else {
      displayGameOverScreen();
    }
  }

  //This function is extremely complicated, and I don't like that
  const userAnswer = () => {
    $(".answer__cell").each((index, cell) => {
      $(cell).on("click", () => {
        let userAnswer = $(cell).text().toLowerCase();
        if (evaluateAnswer(userAnswer) === true) {
          if (difficulty === "very hard") {
            if (currentAnswer != currentWord.meaning) {
              currentAnswer = currentWord.meaning
              displayExtraQuestion()
            } else {
              addScore()
              continueGameLoop()
            }
          } else {
            addScore()
            continueGameLoop()
          }
        } else {
          continueGameLoop()
        }
      })
    })
  }
  userAnswer();

  const playAgain = () => {
    $(".game-over__play-again").on("click", () => {
      prevScore.score = userScore;
      prevScore.difficulty = difficulty;
      console.log(prevScore)
      initializeGame();
    })
  }
  playAgain();

  const displayHelp = () => {
    $(".help__tab").on("click", () => {
      $(".help__content").slideToggle(200, "linear")
      $(".help__tab").animate({
        bottom: "100%",
        opacity: "0"
      }, {
        duration: 200,
        easing: "linear"
      })
    })
    $(".down-arrow").on("click", () => {
      $(".help__content").slideToggle(200, "linear");
      $(".help__tab").animate({
        bottom: "0%",
        opacity: "1"
      }, {
        duration: 200,
        easing: "linear"
      })
    })
  }
  displayHelp();

  //Wow, this is incredibly easy in JQuery!
  const toggleTableCellVisibility = () => {
    $(".table-container div span").each((index, cell) => {
      $(cell).on("click", () => {
        $(cell).toggle();
        $(cell).siblings().toggle()
      })
    })
  }
  toggleTableCellVisibility();

})
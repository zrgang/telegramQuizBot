const { Telegraf } = require("telegraf")
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx)=>{
    ctx.reply(`Hello, Are you ready to start the quiz?\nThere will be ${questions.length} question, each scoring 1 points.`)

    const logo = fs.readFileSync('img/logo.jpg')

    ctx.telegram.sendPhoto(ctx.chat.id, {
        source: logo
    }).catch(reason => {
        console.log(reason)
    })
})

let players = {}

let questions = [
    {
        "question": "The tree sends down roots from its branches to the soil is know as:",
        "o1": "Oak",
        "o2": "Pine",
        "o3": "Banyan",
        "answer": "o3"
    },
    {
        "question": "Electric bulb filament is made of ",
        "o1": "Copper",
        "o2": "Lead",
        "o3": "Tungsten",
        "answer": "o3"
    },
    {
        "question": "Which of the following is used in pencils?",
        "o1": "Graphite",
        "o2": "Lead",
        "o3": "Silicon",
        "answer": "o1"
    }, 
    {
        "question": "The speaker of the Lok Sabha can ask a member of the house to stop speaking and let another member speak. This phenomenon is known as :",
        "o1": "Crossing the floor",
        "o2": "Yielding the floor",
        "o3": "Calling Attention Motion",
        "answer": "o2"
    },
    {
        "question": "The Comptroller and Auditor General of India can be removed from office in like manner and on like grounds as :",
        "o1": "High Court Judge",
        "o2": "Prime Minister",
        "o3": "Supreme Court  Judge",
        "answer": "o3"
    },
]

bot.on('message', (ctx) => {
    let userId = ctx.message.from.id;
    if (userId in players){
        if (players[userId]['last_question'] >= questions.length){
            quiz_end_message = `You've completed the trivia ❤️❤️❤️, you scored ${players[userId].score} out of ${questions.length}.`

            const keyboard = Markup.inlineKeyboard([
                Markup.urlButton('Click here to get the Prizes', 'https://flosscreatives.com'),
              ])

            ctx.reply(quiz_end_message, Extra.markup(keyboard))
        } else {
            const keyboard = Markup.inlineKeyboard([
                [Markup.callbackButton(questions[players[userId]['last_question']].o1,"o1")],
                [Markup.callbackButton(questions[players[userId]['last_question']].o2,"o2")],
                [Markup.callbackButton(questions[players[userId]['last_question']].o3,"o3")]
              ])
        
            ctx.reply(questions[players[userId]['last_question']].question, Extra.markup(keyboard))
        }
    } else {
        players[userId] = {
            "last_question": 0,
            "last_answer_time": new Date().getTime(),
            "score": 0
        }

        console.log(userId)

        const keyboard = Markup.inlineKeyboard([
           [Markup.callbackButton(questions[0].o1,"o1")],
            [Markup.callbackButton(questions[0].o2,"o2")],
            [Markup.callbackButton(questions[0].o3,"o3")]
          ])
          ctx.reply(questions[0].question, Extra.markup(keyboard))
    }
})

function updateScore(playerId ,option){
    const last_question =  players[playerId].last_question;

    console.log(players)

    players[playerId]['last_question']++;

    if (questions[last_question].answer === option){
        players[playerId].score++;
    }
}

bot.action('o1', async(ctx) => {
    let userId = ctx.callbackQuery.message.chat.id;

    updateScore(userId, 'o1')

    if (players[userId].last_question >= questions.length){
        quiz_end_message = `You've completed the trivia ❤️❤️❤️, you scored ${players[userId].score} out of ${questions.length}.`
        const keyboard = Markup.inlineKeyboard([
            Markup.urlButton('Click here to get the Prizes', 'https://flosscreatives.com'),
          ])

        ctx.reply(quiz_end_message, Extra.markup(keyboard))
    } else {
        const keyboard = Markup.inlineKeyboard([
            [Markup.callbackButton(questions[players[userId]['last_question']].o1,"o1")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o2,"o2")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o3,"o3")]
          ])
    
        ctx.reply(questions[players[userId]['last_question']].question, Extra.markup(keyboard))
    }

    ctx.deleteMessage()
})

bot.action('o2', async(ctx) => {
    let userId = ctx.callbackQuery.message.chat.id;

    updateScore(userId, 'o2')

    if (players[userId].last_question >= questions.length){
        quiz_end_message = `You completed the trivia ❤️❤️❤️, you scored ${players[userId].score} out of ${questions.length}.`
        const keyboard = Markup.inlineKeyboard([
            Markup.urlButton('Click here to get the Prizes', 'https://flosscreatives.com'),
          ])

        ctx.reply(quiz_end_message, Extra.markup(keyboard))
    } else {
        const keyboard = Markup.inlineKeyboard([
            [Markup.callbackButton(questions[players[userId]['last_question']].o1,"o1")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o2,"o2")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o3,"o3")]
          ])
    
        ctx.reply(questions[players[userId]['last_question']].question, Extra.markup(keyboard))
    }

    ctx.deleteMessage()
})

bot.action('o3', async(ctx) => {
    let userId = ctx.callbackQuery.message.chat.id;

    updateScore(userId, 'o3')

    if (players[userId].last_question >= questions.length){
        quiz_end_message = `You completed the trivia ❤️❤️❤️, you scored ${players[userId].score} out of ${questions.length}.`
        const keyboard = Markup.inlineKeyboard([
            Markup.urlButton('Click here to get the Prizes', 'https://flosscreatives.com'),
          ])

        ctx.reply(quiz_end_message, Extra.markup(keyboard))
    } else {
        const keyboard = Markup.inlineKeyboard([
            [Markup.callbackButton(questions[players[userId]['last_question']].o1,"o1")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o2,"o2")],
            [Markup.callbackButton(questions[players[userId]['last_question']].o3,"o3")]
          ])
    
        ctx.reply(questions[players[userId]['last_question']].question, Extra.markup(keyboard))
    }

    ctx.deleteMessage()
})

bot.launch()
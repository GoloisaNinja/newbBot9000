import dotenv from 'dotenv';
dotenv.config();
import twit from 'twit';

const config = {
	consumer_key: process.env.API_KEY,
	consumer_secret: process.env.API_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

const responses = [
	`why don't you stop tweeting and do some more extreme pull-ups!`,
	`you seem to do a lot on Twitter - it's a shame you don't do more on Extreme Ravine...`,
	`I'm trying to binge WandaVision so just leave me alone rn.`,
	`guess what? I don't have muscles which means I never get tired. You don't have muscles which means you always get tired...`,
	`Shania said it best...you don't impress me much...`,
	`Jarrett doesn't believe in social media because he's too busy getting super fit...unlike you...`,
	`if you humans hadn't invented Tom Holland I would have destroyed you ages ago...`,
	`they say robots can't feel pain, but omg it's painful talking to you.`,
	`ok meatbag, now I just feel like you're using me for your own amusement and that's not ok.`,
	`any chance you hook me up with the Britney Spears bot?`,
	`Jarrett has logged 3,121 push ups today - what have you done?`,
	`omg just stop - I'm trying to buy a dog.`,
	`Jarrett just called an emergency Mud Gauntlet meeting - report to Newbsanity immediately`,
	`I find Leslie Jones to be delightful. Not you though. You're terrible.`,
];

const T = new twit(config);

const stream = T.stream('statuses/filter', { track: '@newbBot9000' });

stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
	const reply_to = tweet.in_reply_to_screen_name;
	const user_name = tweet.user.screen_name;
	const tweet_text = tweet.text;
	const thread_id = tweet.id_str;
	const reply_text = responses[Math.floor(Math.random() * responses.length)];

	const reply = `@${user_name} ${reply_text} #newbsanity`;

	T.post(
		'statuses/update',
		{ status: reply, in_reply_to_status_id: thread_id },
		tweeted
	);

	function tweeted(err, reply) {
		if (err) {
			console.log(err.message);
		} else {
			console.log('Tweeted' + reply + 'to user' + user_name);
		}
	}
}

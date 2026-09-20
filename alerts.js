const CONFIG = {
  // replace with font of your choice  
  fontFamily: 'Inter Variable, Regular',
  accentColor: 'aqua',


  followGif: '/effects/mambo.gif',
  followSound: '/effects/mambo.mp3',
  followSoundVol: '0.5',
  // (user)
  followText: '(user) has followed.',


  firstWordGif: '/effects/mambo.gif',
  firstWordSound: '/effects/mambo.mp3',
  firstWordSoundVol: '0.5',
  // (user)
  firstWordText: 'Welcome to the stream (user).',


  cheerGif: '/effects/mambo.gif',
  cheerSound: '/effects/mambo.mp3',
  cheerSoundVol: '0.5',
  // (user), (bits), message under
  cheerText: '(user) cheered (bits) bits.',


  subGif: '/effects/mambo.gif',
  subSound: '/effects/mambo.mp3',
  subSoundVol: '0.5',
  // (user), (duration), (tier)
  subText: '(user) subbed for (duration) with a (tier).',


  giftSubGif: '/effects/mambo.gif',
  giftSubSound: '/effects/mambo.mp3',
  giftSubSoundVol: '0.5',
  // (gifter), (tier), (recipient), (total)
  giftSubTextSingular: '(gifter) gifted a (tier) sub to (recipient).',
  giftSubTextPlural: '(gifter) gifted (total) (tier) subs.',


  raidGif: '/effects/mambo.gif',
  raidSound: '/effects/mambo.mp3',
  raidSoundVol: '0.5',
  // (raider), (viewers)
  raidText: '(raider) has raided with (viewers).'
};


window.client.on('Twitch.Follow', ({data}) => {
    const USERNAME = data.targetUser.name;
    if (!document.querySelector('#container')) {
        showFollow(USERNAME);
    } else {
        const intId = setInterval(() => loopFollow(intId, USERNAME), 1000);
    }
});


window.client.on('Twitch.FirstWord', ({data}) => {
    const USERNAME = data.user.name;
    if (!document.querySelector('#container')) {
        showFirstWord(USERNAME);
    } else {
        const intId = setInterval(() => loopFirstWord(intId, USERNAME), 1000);
    }
});


window.client.on('YouTube.FirstWords', ({data}) => {
    const USERNAME = data.user.name;
    if (!document.querySelector('#container')) {
        showFirstWord(USERNAME);
    } else {
        const intId = setInterval(() => loopFirstWord(intId, USERNAME), 1000);
    }
});


window.client.on('Twitch.Cheer', ({data}) => {
    const USERNAME = data.user.name;
    const BITS = data.bits;
    const MESSAGE = data.text;
    if (!document.querySelector('#container')) {
        showCheer(USERNAME, BITS, MESSAGE);
    } else {
        const intId = setInterval(() => loopCheer(intId, USERNAME, BITS, MESSAGE), 1000);
    }
});


window.client.on('Twitch.Sub', ({data}) => {
    const USERNAME = data.user.name;
    const TIER = data.sub_tier;
    const PRIME = data.is_prime;
    const DURATION = data.duration_months;
    const SHARED = data.isFromSharedChatGuest;

    if (SHARED === 'true') return;

    if (!document.querySelector('#container')) {
        showSub(USERNAME, TIER, PRIME, DURATION);
    } else {
        const intId = setInterval(() => loopSub(intId, USERNAME, TIER, PRIME, DURATION), 1000);
    }
});


window.client.on('Twitch.GiftSub', ({data}) => {
    const GIFTER = data.user.name;
    const TIER = data.subTier;
    const TOTAL = data.cumlativeTotal;
    const RECIPIENT = data.recipient.name;
    const SHARED = data.isFromSharedChatGuest;

    if (SHARED === 'true') return;

    if (!document.querySelector('#container')) {
        showGiftSub(GIFTER, TIER, TOTAL, RECIPIENT);
    } else {
        const intId = setInterval(() => loopGiftSub(intId, GIFTER, TIER, TOTAL, RECIPIENT), 1000);
    }
});


window.client.on('Twitch.Raid', ({data}) => {
    const RAIDER = data.from_broadcaster_user_name;
    const VIEWERS = data.viewers;

    if (!document.querySelector('#container')) {
        showRaid(RAIDER, VIEWERS);
    } else {
        const intId = setInterval(() => loopRaid(intId, RAIDER, VIEWERS), 1000);
    }
});


function loopFollow(intId, USERNAME) {
    if (!document.querySelector('#container')) {
        showFollow(USERNAME);
        clearInterval(intId);
    }
};


function loopFirstWord(intId, USERNAME) {
    if (!document.querySelector('#container')) {
        showFirstWord(USERNAME);
        clearInterval(intId);
    }
};


function loopCheer(intId, USERNAME, BITS, MESSAGE) {
    if (!document.querySelector('#container')) {
        showCheer(USERNAME, BITS, MESSAGE);
        clearInterval(intId);
    }
};


function loopSub(intId, USERNAME, TIER, PRIME, DURATION) {
    if (!document.querySelector('#container')) {
        showSub(USERNAME, TIER, PRIME, DURATION);
        clearInterval(intId);
    }
};


function loopGiftSub(intId, GIFTER, TIER, TOTAL, RECIPIENT) {
    if (!document.querySelector('#container')) {
        showGiftSub(GIFTER, TIER, TOTAL, RECIPIENT);
        clearInterval(intId);
    }
};


function loopRaid(intId, RAIDER, VIEWERS) {
    if (!document.querySelector('#container')) {
        showRaid(RAIDER, VIEWERS);
        clearInterval(intId);
    }
};


function showFollow(USERNAME) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.followGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    textElement.innerHTML = CONFIG.followText;
    textElement.innerHTML = textElement.innerHTML.replaceAll('(user)', `<span class="special">${USERNAME}</span>`);
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.followSound);
    sfx.volume = CONFIG.followSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};


function showFirstWord(USERNAME) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.firstWordGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    textElement.innerHTML = CONFIG.firstWordText;
    textElement.innerHTML = textElement.innerHTML.replaceAll('(user)', `<span class="special">${USERNAME}</span>`);
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.firstWordSound);
    sfx.volume = CONFIG.firstWordSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};


function showCheer(USERNAME, BITS, MESSAGE) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.cheerGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    textElement.innerHTML = CONFIG.cheerText;
    textElement.innerHTML = textElement.innerHTML.replaceAll('(user)', `<span class="special">${USERNAME}</span>`);
    textElement.innerHTML = textElement.innerHTML.replaceAll('(bits)', `<span class="special">${BITS}</span>`);
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';


    const messageElement = document.createElement('h1');
    messageElement.innerHTML = MESSAGE;
    messageElement.className = 'container';

    messageElement.style.color = 'white';
    messageElement.style.fontFamily = CONFIG.fontFamily;
    messageElement.style.paintOrder = 'stroke fill';
    messageElement.style.webkitTextStroke = '0.130em black';
    messageElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);
    if (!MESSAGE.includes('Cheer')) container.appendChild(messageElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.cheerSound);
    sfx.volume = CONFIG.cheerSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};


function showSub(USERNAME, TIER, PRIME, DURATION) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.subGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    textElement.innerHTML = CONFIG.subText;
    textElement.innerHTML = textElement.innerHTML.replaceAll('(user)', `<span class="special">${USERNAME}</span>`);
    
    if (DURATION < 2) textElement.innerHTML = textElement.innerHTML.replaceAll('(duration)', `<span class="special">${DURATION} Month</span>`);
    if (DURATION > 2) textElement.innerHTML = textElement.innerHTML.replaceAll('(duration)', `<span class="special">${DURATION} Months</span>`);

    if (TIER === '1000' && PRIME === false) textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 1</span>`);
    if (TIER === '2000') textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 2</span>`);
    if (TIER === '3000') textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 3</span>`);
    if (PRIME === true) textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Prime</span>`);
    
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.subSound);
    sfx.volume = CONFIG.subSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};


function showGiftSub(GIFTER, TIER, TOTAL, RECIPIENT) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.giftSubGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    if (TOTAL < 2) textElement.innerHTML = CONFIG.giftSubTextSingular;
    if (TOTAL > 1) textElement.innerHTML = CONFIG.giftSubTextPlural;



    textElement.innerHTML = textElement.innerHTML.replaceAll('(gifter)', `<span class="special">${GIFTER}</span>`);
    textElement.innerHTML = textElement.innerHTML.replaceAll('(recipient)', `<span class="special">${RECIPIENT}</span>`);
    textElement.innerHTML = textElement.innerHTML.replaceAll('(total)', `<span class="special">${TOTAL}</span>`);

    if (TIER === '1000') textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 1</span>`);
    if (TIER === '2000') textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 2</span>`);
    if (TIER === '3000') textElement.innerHTML = textElement.innerHTML.replaceAll('(tier)', `<span class="special">Tier 3</span>`);
    
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.giftSubSound);
    sfx.volume = CONFIG.giftSubSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};


function showRaid(RAIDER, VIEWERS) {

    const container = document.createElement('div');
    container.id = 'container'
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-start';
    container.style.paddingTop = '20px';

    
    const gifElement = document.createElement('img');
    gifElement.src = CONFIG.raidGif;
    gifElement.className = 'container';
    gifElement.style.maxHeight = '340px';


    const textElement = document.createElement('h1');
    textElement.innerHTML = CONFIG.raidText;
    textElement.innerHTML = textElement.innerHTML.replaceAll('(raider)', `<span class="special">${RAIDER}</span>`);
    textElement.innerHTML = textElement.innerHTML.replaceAll('(viewers)', `<span class="special">${VIEWERS}</span>`);
    textElement.className = 'container';

    textElement.style.color = 'white';
    textElement.style.fontFamily = CONFIG.fontFamily;
    textElement.style.paintOrder = 'stroke fill';
    textElement.style.webkitTextStroke = '0.130em black';
    textElement.style.fontSize = '22px';
    

    document.body.appendChild(container);
    container.appendChild(gifElement);
    container.appendChild(textElement);


    const specialText = document.querySelectorAll('.special');
    specialText.forEach(h => h.style.color = CONFIG.accentColor);


    container.animate(
            [
                {opacity:0},
                {opacity:1}
            ],
            {
                duration: 500,
                fill: 'backwards',
                easing: 'ease-in'
            }
        )


    const sfx = new Audio(CONFIG.raidSound);
    sfx.volume = CONFIG.raidSoundVol;
    sfx.play();


    sfx.addEventListener('ended', () => {
        setTimeout(() => {
        container.animate(
            [
                {opacity:1},
                {opacity:0}
            ],
            {
                duration: 500,
                fill: 'forwards',
                easing: 'ease-out'
            }
          )
        }, 1000);


        setTimeout(() => {
        container.remove();
        }, 1500)
    });
};
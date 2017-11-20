window.addEventListener('load', function() {
  var twittear = document.getElementById('twittear');
  var count = document.getElementById('count');
  var content = document.getElementById('content');
  var contentScroll = content.scrollHeight;

  content.addEventListener('keyup', activate);
  content.addEventListener('keyup', counter);
  content.addEventListener('input', resize);
  twittear.addEventListener('click', send);

  function activate(event) {
    if (content.value === '') {
      twittear.disabled = true;
      twittear.style.backgroundColor = 'gray';
      twittear.style.color = 'black';
    } else {
      twittear.disabled = false;
      twittear.style.backgroundColor = 'skyblue';
      twittear.style.color = 'white';
    }
  };

  function resize(event) {
    var rows = parseInt(content.getAttribute('rows'));
    if (rows < 9999 && content.scrollHeight > contentScroll) {
      rows++;
    } else if (rows > 4 && content.scrollHeight < contentScroll) {
      rows--;
    }
    contentScroll = content.scrollHeight;
    content.setAttribute('rows', rows);
  };

  function counter(event) {
    var countText = content.value.length;
    count.textContent = 140 - countText;
    if (countText >= 140) {
      count.style.color = 'red';
      twittear.disabled = true;
      twittear.style.backgroundColor = 'gray';
      twittear.style.color = 'black';
      twittear.classList.remove('enabled');
    } else if (countText >= 130) {
      count.style.color = 'orange';
      twittear.disabled = false;
    } else if (countText >= 115) {
      count.style.color = 'green';
      twittear.disabled = false;
    } else {
      count.style.color = 'skyblue';
    }
  };

  function send(event) {
    var containerTweets = document.getElementById('container-tweets');
    var nuevoTweet = document.createElement('div');
    nuevoTweet.classList.add('nuevosTweets');
    nuevoTweet.textContent = content.value;
    var hours = document.createElement('p');
    hours.classList.add('hours');
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    var hourEnd = hour + ':' + minute;
    hours.textContent = hourEnd;
    nuevoTweet.appendChild(hours);
    containerTweets.appendChild(nuevoTweet);
    content.value = '';
    count.textContent = 140;
    content.setAttribute('rows', '4');
    activate();
  };
});
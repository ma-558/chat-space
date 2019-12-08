$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
      var html =
        `<div class="message" data-id=${message.id}>
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  } 

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
      .fail(function(){
        alert('error');
      });
      return false;
    });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("id");
      $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML += buildHTML(message)
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
};
  setInterval(reloadMessages, 7000);
});
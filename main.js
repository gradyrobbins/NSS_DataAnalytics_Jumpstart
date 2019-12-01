$(document).ready(function () {
    $("#error").hide()
    $("#error-project").hide()

    getData()
    getDataProjects()

    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {

        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });

    $("#submit-topic-button").click(submitTopic)
       $("#submit-topic-field").keypress(submitTopic)

    function submitTopic(e) {
      if (e.key == "Enter" || e.type == "click"){
        if ($("#submit-topic-field").val() == "") {
          $("#error").show()
        } else {
          $("#error").hide()
          submitData()
        }
      }
    }

    function submitData () {
      $.ajax({
          method: "POST",
                url: "https://jumpstart-review-topics.firebaseio.com/topics.json",
                data: JSON.stringify($("#submit-topic-field").val())})
        .done(function(data){
          console.log(data)
          getData()
            $("#submit-topic-field").val("")
        })
        .fail(function(error){
          console.log("Post Error", error)
        })
    }

    function getData() {
      var topicsToCover = []
      $.ajax("https://jumpstart-review-topics.firebaseio.com/topics.json")
      .done(function(data){
        if (data != null) {
          Object.keys(data).forEach(function(key){
           topicsToCover.push(data[key])
         })
        }
        outputDataToDom(topicsToCover)
      })
      .fail(function(error){
        console.log("Get Error",error)
      })
    }

    function outputDataToDom(datArray) {
      $("#topics-to-cover").html("");
      datArray.forEach(function(arrayItem) {
         $("#topics-to-cover").append("<li>" + arrayItem + "</li>")
      })
    }

    $("#submit-topic-button-project").click(submitTopicProject)
       $("#submit-topic-field-project").keypress(submitTopicProject)

    function submitTopicProject(e) {
      if (e.key == "Enter" || e.type == "click"){
        if ($("#submit-topic-field-project").val() == "") {
          $("#error-project").show()
        } else {
          $("#error-project").hide()
          submitDataProject()
          $("#submit-topic-field-project").val("")
        }
      }
    }

    function submitDataProject () {
      $.ajax({
          method: "POST",
                url: "https://jumpstart-review-topics.firebaseio.com/project-topics.json",
                data: JSON.stringify($("#submit-topic-field-project").val())})
        .done(function(data){
          console.log(data)
          getDataProjects()
        })
        .fail(function(error){
          console.log("Post Error", error)
        })
    }

    function getDataProjects() {
      var topicsToCover = []
      $.ajax("https://jumpstart-review-topics.firebaseio.com/project-topics.json")
      .done(function(data){
        if (data != null) {
          Object.keys(data).forEach(function(key){
           topicsToCover.push(data[key])
         })
        }
        outputDataToDomProject(topicsToCover)
      })
      .fail(function(error){
        console.log("Get Project Error",error)
      })
    }

    function outputDataToDomProject(datArray) {
      $("#topics-to-cover-project").html("");
      datArray.forEach(function(arrayItem) {
         $("#topics-to-cover-project").append("<li>" + arrayItem + "</li>")
      })
    }
  });
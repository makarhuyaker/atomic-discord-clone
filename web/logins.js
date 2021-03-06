$.ajaxSetup({
  contentType: "application/json; charset=utf-8"
})

var APIBase = window.localStorage.getItem("url-api") || "https://discordapp.com"

$(document).ready(function () {
  $("#login").click(login)
  $(".login-endpoints-link").click(function () {
    $("#endpoint-modal").modal()
  })
  $("#settings-save").click(function () {
    window.localStorage.setItem("url-cdn", $("#endpoint-cdn").val() || "https://cdn.discordapp.com")
    window.localStorage.setItem("url-api", $("#endpoint-api").val() || "https://discordapp.com")
    window.localStorage.setItem("url-invite", $("#endpoint-invite").val() || "https://discord.gg")
    $("#endpoint-cdn").val("")
    $("#endpoint-api").val("")
    $("#endpoint-invite").val("")
    APIBase = window.localStorage.getItem("url-api") || "https://discordapp.com"
    if (APIBase.match(/http(s|):\/\/discordapp.com/g)) $("#discord-login-warning").css("display", "block")
    else $("#discord-login-warning").css("display", "none")
    $.modal.close()

  })
  $("#token-login").click(tokenLogin)
  $("#signup-link").click(function () {
    $("#signup-text").css("display", "none")
    $("#login-text").css("display", "inline")
    $(".username").css("display", "inline")
    $(".login-or-signup-btn").text("Sign up").attr("id", "signup").click(signup)
    $("#login-banner").text("Sign up")
    $(".token").css("display", "none")
  })
  $("#login-link").click(function () {
    $("#signup-text").css("display", "inline")
    $("#login-text").css("display", "none")
    $(".username").css("display", "none")
    $(".login-or-signup-btn").text("Log in").attr("id", "login").click(login)
    $("#login-banner").text("Sign in")
    $(".token").css("display", "inline")
  })
  if (window.localStorage.getItem("token")) $("#already-logged-in-banner").css("display", "block")
  if (APIBase.match(/http(s|):\/\/discordapp.com/g)) $("#discord-login-warning").css("display", "block")
})

function login() {
  $.post(APIBase + "/api/auth/login", JSON.stringify({ email: document.getElementById("email").value, password: document.getElementById("password").value }), function (result) {
    if (typeof result == String) result = JSON.parse(result)
    window.localStorage.setItem("token", result.token)
    window.location.href = "serverview.html"
  })
}

function signup() {
  $.post(APIBase + "/api/auth/users/add", JSON.stringify({ email: document.getElementById("email").value, username: document.getElementById("username").value, password: document.getElementById("password").value }), function (result) {
    if (typeof result == String) result = JSON.parse(result)
    if (result.code != 1 || result.message != "success") return alert("An error occurred while signing you up :( Error " + result.code + ": " + result.message)
    login()
  })
}

function tokenLogin() {
  window.localStorage.setItem("token", $("#token").val())
  window.location.href = "serverview.html"
}

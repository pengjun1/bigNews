window.onload = function () {
  var linkReg = document.querySelector("#reg")
  var linkLog = document.querySelector("#log")
  var regBox = document.querySelector(".reg-box")
  var logBox = document.querySelector(".log-box")

  linkReg.onclick = function () {
    regBox.style.display = "none"
    logBox.style.display = "block"
  }
  linkLog.onclick = function () {
    logBox.style.display = "none"
    regBox.style.display = "block"
  }
}

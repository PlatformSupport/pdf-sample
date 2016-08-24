"use strict";
var app,
    pdfDoc,
    currentHeight = 10,
    fileName = "myFile.pdf";

(function () {
    app = {
        init: function () {
            var titleBtn = document.getElementById("titleBtn"),
                textBtn = document.getElementById("textBtn"),
                imgBtn = document.getElementById("imgBtn"),
                addNewPageBtn = document.getElementById("newPageBtn"),
                saveBtn = document.getElementById("saveBtn");

            titleBtn.addEventListener("click", app.addTitle, false);
            textBtn.addEventListener("click", app.addText, false);
            imgBtn.addEventListener("click", app.addImage, false);
            addNewPageBtn.addEventListener("click", app.addNewPage, false);
            saveBtn.addEventListener("click", app.savePdf, false);

            app.createPdf();
        },
        createPdf: function () {
            pdfDoc = new jsPDF();
        },
        addTitle: function () {
            var title = document.getElementById("titleInput").value;
            pdfDoc.setFontSize(32);
            pdfDoc.text(title, 70, currentHeight);
            currentHeight += 25;

            app.showInfo("Title added.");
        },
        addText: function () {
            var text = document.getElementById("textInput").value;
            pdfDoc.setFontSize(14);
            pdfDoc.text(text, 20, currentHeight);
            currentHeight += 10;

            app.showInfo("Text added.");
        },
        addImage: function () {
            var image = document.getElementById("image").src;
            pdfDoc.addImage(image,"JPEG", 20, currentHeight);
            currentHeight += 100;

            app.showInfo("Image added.");
        },
        addNewPage: function () {
            pdfDoc.addPage();
            currentHeight = 10;

            app.showInfo("New page added.");
        },
        savePdf: function () {
            var pdfOutput = pdfDoc.output("blob");

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

                fileSystem.root.getFile("myFile.pdf", { create: true }, function (entry) {
                    var fileEntry = entry;
                    debugger
                    entry.createWriter(function (writer) {
                        writer.onwrite = function (evt) {
                            app.showInfo("File created.");
                            window.location = "open.html";
                        };
                        writer.onerror = function (error) {
                            debugger
                        }

                        writer.write(pdfOutput);
                    }, function (error) {
                        app.showInfo(error);
                    });

                }, function (error) {
                    app.showInfo(error);
                });
            });
        },
        showInfo: function (text) {
            var label = document.getElementById("infoLbl");

            label.innerText = text;
        }
    };

    document.addEventListener("deviceready", app.init, false);
}());


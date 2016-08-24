"use strict";
var app,
    canvas,
    ctx,
    fileName = "myFile.pdf",
    pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8;

(function () {
    app = {
        init: function () {
            canvas = document.getElementById("the-canvas"),
            ctx = canvas.getContext("2d");

            document.getElementById("prevBtn").addEventListener("click", app.onPrevPage);
            document.getElementById("nextBtn").addEventListener("click", app.onNextPage);

            // Needed for Windows Phone compatibility.
            PDFJS.workerSrc = "scripts/pdf.js/pdf.worker.js";

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                                     function (fileSystem) {
                                         app.openFile(fileSystem);
                                     },
                                     function (error) {
                                         app.showError("Could not resolve local file system.");
                                     });
        },
        openFile: function (fileSystem) {
            fileSystem.root.getFile(fileName, null,
                                    function (fileEntry) {
                                        fileEntry.file(
			                                function (file) {
			                                    var reader = new FileReader();
			                                    /* Open the PDF file as a byte array, because there are issues with reading the file directly
                                                   using PDF.js on some devices 
                                                */
			                                    reader.onloadend = function (evt) {
			                                        app.openPdfDocument(new Uint8Array(evt.target.result));
			                                    };

			                                    reader.readAsArrayBuffer(file);
			                                },
			                                function (error) {
			                                    app.showError("Failed to read the file. Try creating a new PDF.");
			                                });

                                    },
                                    function (error) {
                                        if (error.code === 1) {
                                            app.showError("File not found. Create a PDF file first.");
                                        }
                                        else {
                                            app.showError("Failed to read the file. Try creating a new PDF.");
                                        }
                                    });
        },
        openPdfDocument: function (pdfContent) {
            PDFJS.getDocument(pdfContent).then(function (pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById("pageCount").textContent = pdfDoc.numPages;

                // Initial/first page rendering
                app.renderPage(pageNum);
            },
            function (error) {
                app.showError(error);
            });
        },

        // Get page info from document, resize canvas accordingly, and render page.
        renderPage: function (num) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                // Wait for rendering to finish
                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        app.renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });
            // Update page counters
            document.getElementById("pageNum").textContent = pageNum;
        },

        /* If another page rendering in progress, waits until the rendering is
           finised. Otherwise, executes rendering immediately. 
        */
        queueRenderPage: function (num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                app.renderPage(num);
            }
        },

        // Displays previous page.
        onPrevPage: function () {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            app.queueRenderPage(pageNum);
        },

        // Displays next page.
        onNextPage: function () {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            app.queueRenderPage(pageNum);
        },
        showError: function (message) {
            var errorLbl = document.getElementById("errorLabel");

            errorLbl.textContent = "ERROR: " + message;
        }
    };
    document.addEventListener("deviceready", app.init, false);
}());
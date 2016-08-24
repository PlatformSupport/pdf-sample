PDF Create/Open Sample
===========================

<a href="https://platform.telerik.com/#appbuilder/clone/https%3A%2F%2Fgithub.com%2FPlatformSupport%2Fpdf-sample" target="_blank"><img src="http://docs.telerik.com/platform/samples/images/try-in-appbuilder.png" alt="Run in the Platform" title="Run in the Platform" /></a>  

<a id="top"></a>
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Create PDF](#create-pdf)
* [Open PDF](#open-pdf)
* [Limitations](#limitations)

# Overview

This example shows how to create and read PDF files in a hybrid app using [jsPDF](https://parall.ax/products/jspdf/doc/symbols/jsPDF.html) and [PDF.js](https://mozilla.github.io/pdf.js/) libraries.

> *Tested on:* iOS 9+, Android 5+, Windows Phone 8.1+

> *Developed with:* Windows Phone SDK 8.1, Apache Cordova 4.0.0, jsPDF 1.2.60, PDF.js 1.4.20

[Back to Top](#top)

# Screenshots

Platform | Home | Create | Open 
---|---|---|---
All | ![](https://raw.githubusercontent.com/PlatformSupport/pdf-sample/master/screenshots/home.png)| ![](https://raw.githubusercontent.com/PlatformSupport/pdf-sample/master/screenshots/create.png) | ![](https://raw.githubusercontent.com/PlatformSupport/pdf-sample/master/screenshots/open.png)

[Back to Top](#top)

# Create PDF

jsPDF offers an API for simple write operations in a PDF file. You can write text (and apply custom styles to it), draw shapes, add HTML and images in the PDF file. To see examples of the jsPDF library API, go to [their site](https://parall.ax/products/jspdf/doc/symbols/jsPDF.html).

The **Create PDF** page in this sample app shows a simple view for adding differently styled text and images to a PDF file and then saving the file on the device, using the [File plugin](https://github.com/apache/cordova-plugin-file).

[Back to Top](#top)

# Open PDF

Using the PDF.js library, you can parse and render a PDF file directly into your app. This is especially useful for Android and Windows Phone devices that cannot open PDF files inside the app and usually need an external PDF viewer.

There are some specifics about the integration of this library in a Cordova app, that are covered in the **Open PDF** part of the sample. You will be able to find more information in the sample comments. Again, the [File plugin](https://github.com/apache/cordova-plugin-file) is used to get the PDF file content from the device file system.


[Back to Top](#top)


# Limitations

* You cannot run this sample in the device simulator of the In-Browser client.

[Back to Top](#top)
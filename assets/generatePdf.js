//var doc = new jsPDF()

//doc.text('Hello world!', 10, 10);
//doc.save('a4.pdf');

function createPDF2() {
  var sTable = document.getElementById('drucken').innerHTML;

  var style = "<style>";
  style = style + "button {display: none;}";
  style = style + "</style>";

  // CREATE A WINDOW OBJECT.
  var win = window.open('', '', 'height=700,width=700');

  win.document.write('<html><head>');
  win.document.write('<title>Einkaufsliste</title>');   // <title> FOR PDF HEADER.
  win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write('</body></html>');

  win.document.close(); 	// CLOSE THE CURRENT WINDOW.

  win.print();    // PRINT THE CONTENTS.
}



/* function demoFromHTML() {
            var pdf = new jsPDF('p', 'pt', 'letter');
            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            source = $('#ta')[0];

            // we support special element handlers. Register them with jQuery-style
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function(element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
                    source, // HTML string or DOM elem ref.
                    margins.left, // x coord
                    margins.top, {// y coord
                        'width': margins.width, // max width of content on PDF
                        'elementHandlers': specialElementHandlers
                    },
            function(dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }
            , margins);
        } */

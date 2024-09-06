// key variables
var mName, mNumber, mPhoto;

const currentYear = new Date().getFullYear();

const rLink = ``

let cardCanvasFront = $("#cardPreviewCanvas")[0];
let ctx_CC = cardCanvasFront.getContext("2d");
ctx_CC.font = "600 30px Roboto, sans-serif";
ctx_CC.fillStyle = "#2A333A";

let textCanvasFront = $("#detailEntryCanvas")[0];
let ctx_TC = textCanvasFront.getContext("2d");
ctx_TC.font = "600 50px Roboto, sans-serif";
ctx_TC.fillStyle = "#2A333A";
ctx_TC.fillStyle = "textAlign=center";

let yearCanvasFront = $("#yearDetailsCanvas")[0];
let ctx_TCD_Y = yearCanvasFront.getContext("2d");
ctx_TCD_Y.font = "600 55px Roboto, sans-serif";
ctx_TCD_Y.fillStyle = "#FFFFFF";
ctx_TCD_Y.fillStyle = "textAlign=center";
 
let dateYearCanvasFront = $("#dateYearDetailsCanvas")[0];
let ctx_TCD_DY = dateYearCanvasFront.getContext("2d");
ctx_TCD_DY.font = "800 35px Roboto, sans-serif";
ctx_TCD_DY.fillStyle = "#000000";
ctx_TCD_DY.fillStyle = "textAlign=center";



let mugshotCanvas = $("#mugshotCanvas")[0];
let ctx_MSC = mugshotCanvas.getContext("2d");
let isImgUploaded = false;



let cardCanvasBack = $("#cardPreviewCanvasB")[0];
let ctx_CC_B = cardCanvasBack.getContext("2d");
ctx_CC_B.font = "600 40px Roboto, sans-serif";
ctx_CC_B.fillStyle = "#2A333A";

let textCanvasBack = $("#detailEntryCanvasB")[0];
let ctx_TC_B = textCanvasBack.getContext("2d");
ctx_TC_B.font = "600 50px Roboto, sans-serif";
ctx_TC_B.fillStyle = "#2A333A";
ctx_TC_B.fillStyle = "textAlign=center";

let yearCanvasBack = $("#yearDetailsCanvasB")[0];
let ctx_TCD_Y_B = yearCanvasBack.getContext("2d");
ctx_TCD_Y_B.font = "600 45px Roboto, sans-serif";
ctx_TCD_Y_B.fillStyle = "#FFFFFF";
ctx_TCD_Y_B.fillStyle = "textAlign=center";



let downloadCanvas = $("#canvasRender")[0];
let ctx_MC = downloadCanvas.getContext("2d");

let cardBackground = new Image(1056, 2200);
let cardBackground_B = new Image(1056, 2200);


let randomNo = Math.floor(Math.random() * 7999999999999).toString();
let selectedSet = new Array();
let qq = new Array();
let rIndex = 0;
let mfw_audio = new Audio('assets/audio/cant_even_get_in.mp3');



// border radius on the ID photo
function roundedImage(x, y, width, height, radius) {
    ctx_MSC.beginPath();
    ctx_MSC.moveTo(x + radius, y);
    ctx_MSC.lineTo(x + width - radius, y);
    ctx_MSC.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx_MSC.lineTo(x + width, y + height - radius);
    ctx_MSC.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx_MSC.lineTo(x + radius, y + height);
    ctx_MSC.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx_MSC.lineTo(x, y + radius);
    ctx_MSC.quadraticCurveTo(x, y, x + radius, y);
    ctx_MSC.closePath();
}







// generate Current Year - front and back
function drawCurrentYear(location) {

    if (location.match('front')) {
        ctx_TCD_Y.fillText(currentYear, 222, 800, 869) //s, x, y, mw
        ctx_TCD_DY.fillText(currentYear, 690, 1743, 100) //s, x, y, mw
        ctx_TCRL.fillText(currentYear, 690, 1743, 869) //s, x, y, mw
    }
    else if (location.match('back')) {
        ctx_TCD_Y_B.fillText(currentYear, 145, 885, 869) //s, x, y, mw
    }
}







// generate random Ticket Number - front and back
function drawTicketNum(location) {

    if (location.match('front')) {
        ctx_CC.fillText(randomNo, 505, 1930, 869) //s, x, y, mw
    }
    else if (location.match('back')) {
        ctx_CC_B.fillText(randomNo, 505, 1866, 869) //s, x, y, mw
    }
}









// draw canvas for ID card preview and paint background image
function drawBackgroundImage() {
    cardBackground.src = $("#canvasBGImage")[0].src;
    cardBackground.onload = function() {
        ctx_CC.drawImage(cardBackground, 0,0);
        drawTicketNum('front');
        drawCurrentYear('front');
    }
    cardBackground.onerror = function() { cardBackground.src = './assets/img/nth_basic_access_card.png'; }

    cardBackground_B.src = $("#canvasBGImageB")[0].src;
    cardBackground_B.onload = function() {
        ctx_CC_B.drawImage(cardBackground_B, 0,0);
        drawTicketNum('back');
        drawCurrentYear('back');
    }
    cardBackground_B.onerror = function() { cardBackground.src = './assets/img/ts_and_cs.png'; }
}






// upon file select, paste/draw the image on the Canvas
function uploadMugshot(e) {

    let file = this.files[0];
    let fileType = file["type"];
    let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if ($.inArray(fileType, validImageTypes) < 0) {
        return toastr.error(
            'Please upload an image with one of these filetypes: [.jpg, .jpeg, .png, .gif, .webp]',
            'Image Upload Error',
            {closeButton: 'true', timeOut: 0, extendedTimeout: 0}
        );
    }

    if (isImgUploaded) ctx_MSC.clearRect(0, 0, mugshotCanvas.width, mugshotCanvas.height); // clear already existing image
    let reader = new FileReader();
    reader.onload = function(event) {
        let uploadedImg = new Image();
        uploadedImg.onload = function() {
            roundedImage(335, 950, 385, 385, 10);
            ctx_MSC.clip();
            ctx_MSC.drawImage(uploadedImg, 335, 948, 385, 395);  
            isImgUploaded = true;
            toastr.info('If the image doesn\'t fit as expected, try using an image with "square" dimensions... :)', 'Image Uploaded');
        }
        uploadedImg.onerror = function() {
            toastr.error('Upload Error', 'Your image could not be uploaded. Please try with another image.');
        }
        uploadedImg.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}





// function that combines 2 canvases into a 3rd
function combineCanvases(location) {

    ctx_MC.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);

    if(location.match('front')) {
        ctx_MC.drawImage(cardCanvasFront, 0, 0);
        ctx_MC.drawImage(textCanvasFront, 0, 0);
        ctx_MC.drawImage(yearCanvasFront, 0, 0);
        ctx_MC.drawImage(dateYearCanvasFront, 0, 0);
        ctx_MC.drawImage(mugshotCanvas, 0, 0);
    }

    if(location.match('back')) {
        ctx_MC.drawImage(cardCanvasBack, 0, 0);
        ctx_MC.drawImage(textCanvasBack, 0, 0);
    }
}




// function that changes the id card mockup
function changeBackground(cType) {

    if (cType.match('b')) {
        cardBackground.src = './assets/img/basic_access_card.png';
    }

    else if (cType.match('v')) {
        cardBackground.src = './assets/img/vip_access_card.png';
    }

    cardBackground.onload = function() {
        ctx_CC.clearRect(0, 0, textCanvasFront.width, textCanvasFront.height);
        ctx_CC.drawImage(cardBackground,0,0);
        drawTicketNum('front');
    }
    cardBackground.onerror = function() {
        cardBackground.src = './assets/img/nth_basic_access_card.png';
    }

}





// download copy of the generated card
function downloadImage(location) {

    if(location.match('front')) {
        combineCanvases('front');
        let dataURL = downloadCanvas.toDataURL("image/png");
        let dLink = $("#pseudoDownload a");
        var fileName = "MC" + currentYear + "-AccessCard-" + randomNo.toString() +".png";
        dLink.attr("href", downloadCanvas.toDataURL());
        dLink.attr("download", fileName);
        dLink[0].click();


        $.ajax({
            type: "POST",
            url: 'save.php',
            data: { base64: dataURL, fName: fileName },
            success: function (response) {
                console.log(response);
            },
            fail: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            cache: false,
        });

    }


    else if(location.match('back')) {
        combineCanvases('back');
        let dataURL = downloadCanvas.toDataURL("image/png");
        let dLink = $("#pseudoDownload a");
        dLink.attr("href", downloadCanvas.toDataURL());
        dLink.attr("download", "MC2021-AccessCard-Ts&Cs.png");
        dLink[0].click();
    }
    
    toastr.success('Downloading image...');
}





// load VIP questions
function loadQuestion() {

    rIndex = Math.floor(Math.random() * Math.floor(5));

    qq.push([
        'Your birthday finally arrived. Your partner got you another pair of socks for your birthday... What do you do?',
        ['Accept them with open arms and add them to the drawer full of all the many other socks.', 'Demand a PS5', 'Take matters into your own hands and order a PS5 online using her credit card 👀'],
        2,
        'You deserve better than socks for your birthday, TBH.'
    ]);
    qq.push([
        'You start to notice that your significant other is not pulling her weight in the relationship. She takes, but does not reciprocate the giving... What do you do?',
        ['Continue giving... Men are the meant to be the sOlE pRoVidErs anyway.', 'Bring it up in a discussion. Request that the effort be 2-sided. And if nothing changes after some time, excuse yourself from the relationship peacefully.'],
        1,
        'Know your worth at all times. If she\'s really the one for you, your effort will be reciprocated. NB: This message is only for dudes who *actually* try.'
    ]);
    qq.push([
        'You finally exchange numbers with a lady you fancy. You start texting on WhatsApp but you start to notice her replies come with zero interest/effort... What do you do?',
        ['Keep persisting... She\'ll come around eventually.', 'Ask her why she\'s not interested in you.', 'Take your L. Delete the conversation, her number and move on silently.'],
        2,
        'Nah bro. Respect her lack of interest in you. You tried, it didn\'t work. Let it be.'
    ]);
    qq.push([
        'Your partner did something that made you upset and instead of apologizing, she\'s trying to make up for it by seducing you with a mating dance... What do you do?',
        ['Turn down the offer... She MUST take accountability for her actions.', 'Accept the offer and forgive her.','Accept the offer and still not forgive her.'],
        0,
        'Nah bro. . . A-c-c-o-u-n-t-a-b-i-l-i-t-y'
    ]);



    selectedSet = qq[rIndex];

    if (selectedSet != null) {

        $("#quizLabel").html(selectedSet[0]);

        $("#quizOptions").empty();
        let optionText = "";
        for (i = 0; i < selectedSet[1].length; i++) {
            optionText = '<div class="form-check">'
                .concat('<input class="form-check-input" type="radio" name="quizRadio" id="quizRadio').concat(i+1).concat('" value="').concat(i).concat('">')
                .concat('<label class="form-check-label" id="quizRadio').concat(i+1).concat('" for="quizRadio').concat(i+1).concat('">').concat(selectedSet[1][i]).concat('</label></div>');

            $("#quizOptions").append(optionText);
        }
    }

}


// mark and judge
function assessQuiz(e) {

    e.preventDefault();
    $("#messagePrompt").empty();

    let sOption = $('input[name=quizRadio]:checked', '#VIPAccessForm').val();
    let cOption = selectedSet[2];

    if(!sOption) {
        console.log("I feel so empty inside :)");
        $("#messagePrompt").removeClass('visually-hidden');
        $("#messagePrompt").html('You need to pick one. . .');
        return;
    }


    if(sOption && (sOption != cOption)) {
        $("#messagePrompt").removeClass('visually-hidden');
        $("#messagePrompt").html(selectedSet[3]);
    }

    else if(sOption && (sOption == cOption)) {
        $("#worthyPrompt").removeClass('visually-hidden');
        $("#VIPAccessForm").addClass('visually-hidden');
        changeBackground('v');
    }



}


// for the curious
function reloadQuiz() {

    $("#worthyPrompt").addClass('visually-hidden');
    $("#VIPAccessForm").removeClass('visually-hidden');
    loadQuestion();
}






// add event listeners to form input (on key press)
function registerEventListeners() {
    $("#inputName").on('input', function() {
        ctx_TC.clearRect(0, 0, textCanvasFront.width, textCanvasFront.height);
        ctx_TC.fillText($(this).val(), 520, 1450, 800); //s, x, y, mw
        ctx_TC.textAlign = "center"; //s, x, y, mw
    });

    $("#downloadButtonFront").on('click', function(e) {
        e.preventDefault();
        downloadImage('front');
    });

    $("#downloadButtonBack").on('click', function(e) {
        e.preventDefault();
        downloadImage('back');
    });

    $("#messageForWomen").on('click', function() {
        mfw_audio.currentTime = 0;
        mfw_audio.play();
    });

    $("#quizSubmitButton").on('click', assessQuiz);


    $("#tryAnotherButton").on('click', function(e) {
        e.preventDefault();
        reloadQuiz();
    })
}






// main function
$(function() {

    // tooltips init
    $('[data-toggle="tooltip"]').tooltip();



    // auto-generated ID number
    $("#inputTicketNo").val(randomNo);

    // paint background image
    drawBackgroundImage();


    // handle image upload listener
    $("#inputPhoto").on('change', uploadMugshot);


    // initialize respective event listeners
    registerEventListeners();


    // load questions for VIP access card
    loadQuestion();

});
// adding checkbox next to all the links
s = document.getElementsByTagName("a");

for (i=0; i<s.length; i++)
{
	var box = document.createElement("input");			

	var att = document.createAttribute("type");       
	att.value = "checkbox";                         
	box.setAttributeNode(att); 

	var att = document.createAttribute("name");       
	att.value = "downloadSelect";                   
	box.setAttributeNode(att); 

	var att = document.createAttribute("value");    
	att.value = s[i].href;                          
	box.setAttributeNode(att); 

	var att = document.createAttribute("data-filename");    
	att.value = s[i].innerText;                          
	box.setAttributeNode(att);

	console.log(s[i].parentNode.insertBefore(box, s[i]))
}




//injecting script to addon click event for the multi download button
var script = document.createElement("script");

var script_content = `var checkedBoxes = document.querySelectorAll('input[name=downloadSelect]:checked');
var links = {};
for (i = 0; i<checkedBoxes.length; i++)
{
	// links.push(checkedBoxes[i].value);
	links[checkedBoxes[i].getAttribute("data-filename")] = checkedBoxes[i].value;	 
}

subject_name = document.getElementsByTagName("table")[1].getElementsByTagName("td")[9].innerText;
teacher_name = document.getElementsByTagName("table")[1].getElementsByTagName("td")[11].innerText;

window.postMessage({links: links, subject: subject_name, teacher: teacher_name}, '*');
`

script.textContent = "function multiDownload_click(){\n" + script_content + "}";

(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);




// injecting html for the multi download button
var button = document.createElement("input");

var att = document.createAttribute("type");    
att.value = "button";                          
button.setAttributeNode(att); 

var att = document.createAttribute("class");    
att.value = "submit2";                          
button.setAttributeNode(att); 

var att = document.createAttribute("name");     
att.value = "multiDownload";                       
button.setAttributeNode(att); 

var att = document.createAttribute("value");       
att.value = "multiDownload";                          
button.setAttributeNode(att); 

var att = document.createAttribute("onclick");       
att.value = "multiDownload_click()";                          
button.setAttributeNode(att); 

console.log(document.getElementsByName("coursepage")[0].appendChild(button));



// getting checked urls from injected code to the contect script
window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || !message.links) {
    return;
  }

  chrome.runtime.sendMessage(message);
  // console.log(message.links);
});







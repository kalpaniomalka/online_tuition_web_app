import mimetypes
import email
import email.mime.application
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from email.mime.base import MIMEBase
from email import encoders

def getTemplate(name,id,course,amount):
    html_table1 = """<html>
      <body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        
        <br>
        <table width="700" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td colspan="2" align="left" valign="top" bgcolor="#3377FF" style="background-color:#0C0930; padding:20px; font-family:Georgia, 'Times New Roman', Times, serif; color:#F7F8FA; font-size:38px;">Payemnt Verification</td>
            </tr>
          <tr>
            
            <td align="left" valign="top" style="background-color:#F9FAFA    ; padding:10px;" bgcolor="#e4e4e4;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="left" valign="top" style="font-family:Verdana, Geneva, sans-serif; color:#6e6e6e;">
                <div style="font-size:20px;"><b>Hi """""", </b></div>
                <div style="font-size:14px;"><br>
                 <p>
                    Your bank slip was successfully received by Eduhelp.
                 </p>

                           </div>
    
              </tr>
            </table></td>
          </tr>
        </table>
        <br>
        <br>
      </tr>
    </table>
   
   <table>
    <table width="100%" border='1' style='border-collapse:collapse; text-align: left;'><tr><th>Name</th><th>"""+name+"""""""</th></tr><tr><th>Registration Number</th><th>"""+id+"""""""</th></tr><tr><th>Course</th><th>"""+course+"""</th></tr><tr><th>Amount</th><th>(LKR) """+amount+"""</th></tr>
    
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        
        <br>
        <table width="700" border="0" cellspacing="0" cellpadding="0">

          <tr>
            
            <td align="left" valign="top" style="background-color:#F9FAFA ; padding:10px;" bgcolor="#e4e4e4;"><table width="100%" border="0" cellspacing="0" cellpadding="0">		 
                  
                    Please note that this is a generic mail sent out to all the students.

                  <p>
                          <br>
                     <p>
                    Meeting Link : <a href="https://www.google.com/search?gs_ssp=eJzj4tTP1TcwMU02T1JgNGB0YPBiS8_PT89JBQBASQXT&q=google&oq=goo&aqs=chrome.1.69i57j46i131i199i433i465i512j0i131i433i512j69i60l3j69i65l2.43007j0j7&sourceid=chrome&ie=UTF-8">Click Here To Join</a>.
                 </p>


                  </p>
                  </div>
    
              </tr>
            </table></td>
          </tr>
        </table>
        <br>
        <br>
    </body>
    </html>
 """ 
    msg = MIMEMultipart()
    mimeT = MIMEText(html_table1, 'html')
    msg.attach(mimeT)
    return msg

const dayjs = require("dayjs");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

module.exports.getEmails = (options) => {
  return new Promise((resolve, reject) => {
    const { email, pass } = options;
    const imapConfig = {
      user: email,
      password: pass,
      host: "outlook.office365.com",
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    };
    try {
      const imap = new Imap(imapConfig);
      let code = null;
      imap.once("ready", () => {
        imap.openBox("INBOX", false, () => {
          imap.search(
            [
              "ALL",
              ["SINCE", dayjs().subtract(1, "day").format("MMMM DD,YYYY")],
              ["SUBJECT", "Confirm your new email"],
              ["FROM", "accounts@malwarebytes.com"],
            ],
            (err, results) => {
              const uid = results?.reverse()?.[0];
              if (!uid) reject("mail not found");
              if (err) reject(err);
              const f = imap.fetch(uid, { bodies: ['TEXT'] });
              f.on("message", (msg) => {
                msg.on("body", (stream) => {
                  simpleParser(stream, async (err, parsed) => {
                    const { from, subject, textAsHtml, text } = parsed;
                    code = text.match(/Here is your code: (.*)/g)?.[0]?.slice(-6);
                    console.log(code);
                    if (code) {
                      imap.addFlags(uid, ["\\Deleted"], (err) => {
                        //Seen, Deleted
                        if (err) reject(err)
                        console.log('set flag Seen')
                        resolve(code);
                      });
                    } else reject("code not found");
                  });
                });
                // msg.once("attributes", (attrs) => {
                //   const { uid } = attrs;
                //   imap.addFlags(uid, ["\\Seen"], (err) => { //Seen, Deleted
                //     //Deleted
                //     resolve(code);
                //     // Mark the email as read after reading it
                //     console.log("Marked as read!");
                //   });
                // });
              });

              f.once("error", (ex) => {
                return reject(ex);
              });
              f.once("end", () => {
                console.log("Done fetching all messages!");
                imap.end();
              });
            }
          );
        });
      });

      imap.once("error", (err) => {
        console.log(err);
        reject(err);
      });

      imap.once("end", () => {
        console.log("Connection ended");
        if(code) resolve(code)
      });

      imap.connect();
    } catch (err) {
      console.log("err", err);
      reject(err);
    }
  });
};

module.exports.checkLive = (options) => {
  return new Promise((resolve, reject) => {
    const { email, pass } = options;
    const imapConfig = {
      user: email,
      password: pass,
      host: "outlook.office365.com",
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    };
    try {
      const imap = new Imap(imapConfig);
      let code = null;
      imap.once("ready", () => {
        imap.openBox("INBOX", false, () => {
          imap.search(
            [
              "ALL",
              ["SINCE", dayjs().subtract(1, "day").format("MMMM DD,YYYY")],
              ["SUBJECT", "Confirm your new email"],
              ["FROM", "accounts@malwarebytes.com"],
            ],
            (err, results) => {
              if (err) reject(err);
              const uid = results?.reverse()?.[0];
              if (!uid) reject("mail not found");
              else resolve(null)
            }
          );
        });
      });

      imap.once("error", (err) => {
        console.log(err);
        reject(err);
      });

      imap.once("end", () => {
        console.log("Connection ended");
        resolve(null)
      });

      imap.connect();
    } catch (err) {
      console.log("err", err);
      reject(err);
    }
  });
};
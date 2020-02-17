module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <h3>We'd like your input</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="https://afternoon-mesa-80131.herokuapp.com/">Yes</a>
          </div>
          <div>
            <a href="https://afternoon-mesa-80131.herokuapp.com/">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const redirectDocument = `
<html>
  <head>
    <title>Redirecting...</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        text-align: center;
      }
      .gr4vy__status {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes gr4vy-sweep {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 600px 0;
        }
      }
      
      .gr4vy__loading {
        height: 8px;
        background-image: linear-gradient(
          90deg,
          #009cde 25%,
          #bee7fa 25%,
          #bee7fa 75%,
          #009cde 75%
        );
        background-size: 600px 8px;
        -webkit-animation: gr4vy-sweep 2s infinite cubic-bezier(0.2, 0.75, 0.77, 0.25);
        animation: gr4vy-sweep 2s infinite cubic-bezier(0.2, 0.75, 0.77, 0.25);
      }
    </style>
  </head>
  <div class="gr4vy__loading"></div>
  <div class="gr4vy__status">
    <p>Redirecting to payment provider...</p>
  </div>
</html>
`

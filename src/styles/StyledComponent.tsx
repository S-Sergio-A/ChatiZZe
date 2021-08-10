import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: any) => props.theme.layout};

    & .btn-nav {
      color: ${(props: any) => props.theme.secondaryColor};

      & + span {
        background: ${(props: any) => props.theme.primaryBackground};
      }
    }

    & .btn-pr {
      color: ${(props: any) => props.theme.primaryColor};
      border: 1px solid ${(props: any) => props.theme.primaryBorderColor};

      &:hover {
        color: ${(props: any) => props.theme.secondaryColor};

        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &:active {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &:focus {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &:focus-visible {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &:focus-within {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &:-moz-focusring {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &.active {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      &.dark {
        border-color: ${(props: any) => props.theme.secondaryBorderColor};
        color: ${(props: any) => props.theme.secondaryColor};

        &:hover {
          color: ${(props: any) => props.theme.secondaryColor};

          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }

        &:active {
          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }

        &:focus {
          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }

        &:focus-visible {
          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }

        &:focus-within {
          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }

        &:-moz-focusring {
          &:before,
          &:after {
            background: ${(props: any) => props.theme.secondaryBackground};
          }
        }
      }
    }

    & .btn-sec {
      background: ${(props: any) => props.theme.primaryColor};
      border-color: ${(props: any) => props.theme.secondaryBorderColor};
      color: ${(props: any) => props.theme.secondaryColor};

      &:hover {
        background: ${(props: any) => props.theme.secondaryBackground};
      }

      &:active {
        background: ${(props: any) => props.theme.secondaryBackground};
      }

      &:focus {
        background: ${(props: any) => props.theme.secondaryBackground};
      }

      &:focus-visible {
        background: ${(props: any) => props.theme.secondaryBackground};
      }

      &:-moz-focusring {
        background: ${(props: any) => props.theme.secondaryBackground};
      }

      &.active {
        background: ${(props: any) => props.theme.secondaryBackground};
      }
    }

    & .btn-ter {
      background: ${(props: any) => props.theme.primaryBorderColor};
      color: ${(props: any) => props.theme.secondaryColor};

      & > svg {
        fill: ${(props: any) => props.theme.primaryColor};
      }

      &:hover {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }

      &:active {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }

      &:focus {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }

      &:focus-visible {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }

      &:-moz-focusring {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }

      &.active {
        background: ${(props: any) => props.theme.secondaryBorderColor};

        & > svg {
          fill: ${(props: any) => props.theme.secondaryColor};
        }
      }
    }

    & .card {
      background: ${(props: any) => props.theme.primaryColor};
      box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
      -webkit-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
      -moz-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
      -o-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
    }

    & .chat-header {
      border-bottom-color: ${(props: any) => props.theme.primaryBorderColor};
    }

    & .input-area {
      border-top-color: ${(props: any) => props.theme.primaryBorderColor};

      .editing {
        background: ${(props: any) => props.theme.primaryColor};
        border-color: ${(props: any) => props.theme.primaryBorderColor};
      }

      .container, .container > textarea {
        color: ${(props: any) => props.theme.secondaryColor};
        border-color: ${(props: any) => props.theme.primaryBorderColor};
        background-color: ${(props: any) => props.theme.primaryColor};

        ::-webkit-scrollbar-thumb {
          background: rgba(${(props: any) => props.theme.secondaryBorderColor}, 0.35);
        }

        ::-webkit-scrollbar-track {
          background: rgba(${(props: any) => props.theme.secondaryBorderColor}, 0.25);
        }
      }
    }

    & .chat-message > .author {
      color: ${(props: any) => props.theme.primaryBackground};
    }

    & .user-menu {
      background: ${(props: any) => props.theme.primaryColor};

      .user-menu-item > * {
        color: ${(props: any) => props.theme.secondaryColor};
      }
    }

    & .modal-container {
      background-color: rgba(${(props: any) => props.theme.primaryColor}, 0.7);
      color: rgba(${(props: any) => props.theme.secondaryColor}, 0.5);

      .modal-content {
        background: ${(props: any) => props.theme.primaryColor};
        border-color: ${(props: any) => props.theme.secondaryBorderColor};

        & > * {
          background: ${(props: any) => props.theme.primaryColor};
        }

        .modal-body {
          border-color: ${(props: any) => props.theme.secondaryBorderColor};
        }

        .modal-footer {
          border-color: ${(props: any) => props.theme.secondaryBorderColor};
        }

        .ruler {
          background: ${(props: any) => props.theme.layout};
          border-color: ${(props: any) => props.theme.secondaryBorderColor};
        }
      }
    }

    & .ch-wr.focused {
      outline-color: ${(props: any) => props.theme.primaryBackground};
      -moz-outline-color: ${(props: any) => props.theme.primaryBackground};

      .checkbox-c svg {
        fill: ${(props: any) => props.theme.primaryColor};
      }

      .s-checkbox {
        border-color: ${(props: any) => props.theme.secondaryColor};
        background: ${(props: any) => props.theme.primaryColor};

        &.checked {
          background: ${(props: any) => props.theme.primaryBackground};
        }
      }
    }

    & .link {
      color: ${(props: any) => props.theme.primaryColor};

      &:hover {
        color: ${(props: any) => props.theme.primaryBackground};
      }

      &:active {
        color: ${(props: any) => props.theme.primaryBackground};
      }

      &:focus {
        color: ${(props: any) => props.theme.primaryBackground};
      }

      &:focus-visible {
        color: ${(props: any) => props.theme.primaryBackground};
      }

      &:-moz-focusring {
        color: ${(props: any) => props.theme.primaryBackground};
      }
    }

    .active-link {
      background: ${(props: any) => props.theme.primaryBackground};
      border-color: ${(props: any) => props.theme.primaryBackground};
    }

    & .dropdown {
      background: ${(props: any) => props.theme.layout};
      border-color: ${(props: any) => props.theme.secondaryBorderColor};
    }

    & .country-dropdown {
      background: ${(props: any) => props.theme.layout};
      border-color: ${(props: any) => props.theme.secondaryBorderColor};

      li button {
        background: ${(props: any) => props.theme.layout};
        border-color: ${(props: any) => props.theme.secondaryBorderColor};
      }
    }

    & .footer {
      background: ${(props: any) => props.theme.secondaryBackground};

      h2 {
        color: ${(props: any) => props.theme.secondaryColor};
      }

      .footer-b {
        background: ${(props: any) => props.theme.primaryBackground};

        p {
          color: ${(props: any) => props.theme.primaryColor};
        }
      }
    }

    & input {
      border-color: ${(props: any) => props.theme.primaryBorderColor};
      background-color: ${(props: any) => props.theme.primaryColor};
      color: ${(props: any) => props.theme.secondaryColor} !important;

      &:focus {
        border-color: ${(props: any) => props.theme.primaryBackground};
      }

      &:not([value=""]) {
        border-color: ${(props: any) => props.theme.primaryBackground};
      }

      &.notEmpty {
        border-color: ${(props: any) => props.theme.primaryBackground} !important;
      }

      &.search {
        border-color: ${(props: any) => props.theme.primaryBorderColor};

        &:focus {
          box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -webkit-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -moz-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -o-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
        }

        &:focus-visible {
          box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -webkit-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -moz-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -o-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
        }

        &:-moz-focusring {
          box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -webkit-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -moz-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
          -o-box-shadow: 0 0 5px ${(props: any) => props.theme.primaryBackground};
        }
      }
    }

    & input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px ${(props: any) => props.theme.primaryColor} inset !important;
    }

    & label {
      color: ${(props: any) => props.theme.secondaryColor};
    }

    & .form-l {
      color: ${(props: any) => props.theme.secondaryColor};
    }

    & .transform-label {
      color: ${(props: any) => props.theme.primaryBackground} !important;
      background: ${(props: any) => props.theme.primaryColor} !important;
    }

    & .nav {
      background: ${(props: any) => props.theme.secondaryBackground};
    }

    & .menu {
      background: ${(props: any) => props.theme.primaryColor};

      .menu-item * {
        color: ${(props: any) => props.theme.secondaryColor};
      }
    }

    & .toast {
      background: rgba(${(props: any) => props.theme.primaryColor}, 0.5);
      box-shadow: 0 0 20px 2px rgba(${(props: any) => props.theme.secondaryColor}, 0.6);
      -webkit-box-shadow: 0 0 20px 2px rgba(${(props: any) => props.theme.secondaryColor}, 0.6);
      -moz-box-shadow: 0 0 20px 2px rgba(${(props: any) => props.theme.secondaryColor}, 0.6);
      -o-box-shadow: 0 0 20px 2px rgba(${(props: any) => props.theme.secondaryColor}, 0.6);
    }

    & .tooltip {
      background: linear-gradient(180deg, ${(props: any) => props.theme.primaryColor}, transperent);
      background: -webkit-linear-gradient(180deg, ${(props: any) => props.theme.primaryColor}, transperent);
      background: -moz-linear-gradient(180deg, ${(props: any) => props.theme.primaryColor}, transperent);
      background: -o-linear-gradient(180deg, ${(props: any) => props.theme.primaryColor}, transperent);
      background: -ms-linear-gradient(180deg, ${(props: any) => props.theme.primaryColor}, transperent);
      border: 1px solid ${(props: any) => props.theme.secondaryBorderColor};
    }

    & .switch, .tr-switch {
      background: ${(props: any) => props.theme.primaryColor};
      border-color: ${(props: any) => props.theme.primaryBackground};

      label {
        background: ${(props: any) => props.theme.layout};

        &:after {
          background: ${(props: any) => props.theme.primaryColor};
        }
      }

      button.switch-position {
        &:focus-visible {
          box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -webkit-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -moz-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -o-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
        }

        &:-moz-focusring {
          box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -webkit-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -moz-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
          -o-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
        }
      }

      span.pointer {
        background: ${(props: any) => props.theme.primaryBackground};
        border-color: ${(props: any) => props.theme.primaryColor};
        box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
        -webkit-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
        -moz-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
        -o-box-shadow: 0 0 0 3px ${(props: any) => props.theme.primaryBackground};
      }

      input[type="checkbox"]:checked + label {
        background: ${(props: any) => props.theme.primaryBackground};
      }
    }

    & .message-timestamp {
      color: ${(props: any) => props.theme.secondaryColor};
      opacity: 0.6;
      -moz-opacity: 0.6;
    }

    & .message-user {
      color: ${(props: any) => props.theme.primaryBackground};
    }

    & .message-others {
      background: ${(props: any) => props.theme.layout};
      box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -webkit-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -moz-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -o-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      border: none;

      & > .msg-tail {
        fill: ${(props: any) => props.theme.layout};
        filter: drop-shadow(1px 1px 2px ${(props: any) => props.theme.primaryBackground});
        -webkit-filter: drop-shadow(1px 1px 2px ${(props: any) => props.theme.primaryBackground});
      }

      & > .back {
        background: ${(props: any) => props.theme.layout};
      }
    }

    .message-yours {
      background-color: ${(props: any) => props.theme.secondaryBackground};
      box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -webkit-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -moz-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      -o-box-shadow: 0 0 5px 0 ${(props: any) => props.theme.primaryBackground};
      border: none;

      & > .msg-tail {
        fill: ${(props: any) => props.theme.secondaryBackground};
        filter: drop-shadow(1px 1px 2px ${(props: any) => props.theme.primaryBackground});
        -webkit-filter: drop-shadow(1px 1px 2px ${(props: any) => props.theme.primaryBackground});
      }

      & > .back {
        background: ${(props: any) => props.theme.secondaryBackground};
      }
    }

    & .chat-list .search-field > .btn-pr {
      &:hover {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &:active {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &:focus {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &:focus-visible {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &:focus-within {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &:-moz-focusring {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }

      &.active {
        &:before,
        &:after {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }
    }

    & .btn-e > svg {
      fill: ${(props: any) => props.theme.primaryColor};
    }

    & svg {
      fill: ${(props: any) => props.theme.secondaryColor};
    }

    & .base.chat [class^="placeholder"] {
      background: ${(props: any) => props.theme.primaryColor};
    }

    & [class*="-page"] {
      background: ${(props: any) => props.theme.primaryColor};
      color: ${(props: any) => props.theme.secondaryColor};
    }

    & .attr-page {
      a {
        color: ${(props: any) => props.theme.secondaryColor};
        text-decoration: underline;
      }
    }

    & .info-page {
      color: ${(props: any) => props.theme.secondaryColor};

      li {
        color: ${(props: any) => props.theme.secondaryColor};
        box-shadow: 0 1px 12px rgba(${(props: any) => props.theme.secondaryColor});
        -webkit-box-shadow: 0 1px 12px rgba(${(props: any) => props.theme.secondaryColor});
        -moz-box-shadow: 0 1px 12px rgba(${(props: any) => props.theme.secondaryColor});
        -o-box-shadow: 0 1px 12px rgba(${(props: any) => props.theme.secondaryColor});

        h2 {
          background: ${(props: any) => props.theme.secondaryBackground};
        }
      }
    }

    & .contact-page {
      a {
        color: ${(props: any) => props.theme.secondaryColor};
        text-decoration: underline;
      }

      textarea {
        color: ${(props: any) => props.theme.secondaryColor};
        background: ${(props: any) => props.theme.primaryColor};
        border: 1px solid ${(props: any) => props.theme.primaryBackground};
      }
    }

    & .registration-page .card h1 {
      color: ${(props: any) => props.theme.primaryBackground};
    }

    & .features-page {
      li {
        box-shadow: 0 1px 8px rgba(${(props: any) => props.theme.secondaryColor});
        -webkit-box-shadow: 0 1px 8px rgba(${(props: any) => props.theme.secondaryColor});
        -moz-box-shadow: 0 1px 8px rgba(${(props: any) => props.theme.secondaryColor});
        -o-box-shadow: 0 1px 8px rgba(${(props: any) => props.theme.secondaryColor});
      }
    }

    & .login-page {
      .card h1 {
        color: ${(props: any) => props.theme.primaryBackground};
      }

      .b-b a, .b-b button {
        color: ${(props: any) => props.theme.primaryBackground};
      }
    }

    & .registration-page .b-b a {
      color: ${(props: any) => props.theme.primaryBackground}
    }

    & .main-page {
      .download-now, .features {
        background: ${(props: any) => props.theme.layout};
      }

      .how-it-works, .intro {
        background: ${(props: any) => props.theme.primaryColor};
      }

      .how-it-works {
        .col.grid span {
          background: ${(props: any) => props.theme.secondaryBackground};
        }

        button {
          background: transparent;

          svg path {
            fill: ${(props: any) => props.theme.primaryBackground};
          }

          svg:hover path {
            fill: ${(props: any) => props.theme.secondaryBackground};
          }

          svg:active {
            fill: ${(props: any) => props.theme.secondaryBackground};
          }

          svg:focus {
            fill: ${(props: any) => props.theme.secondaryBackground};
          }

          svg:focus-visible {
            fill: ${(props: any) => props.theme.secondaryBackground};
          }

          svg:-moz-focusring {
            fill: ${(props: any) => props.theme.secondaryBackground};
          }
        }
      }
    }
  }

  & p, h1, h2, h3, h4, h5, h6, span {
    color: ${(props: any) => props.theme.secondaryColor};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props: any) => props.theme.primaryBackground};
  }

  ::-webkit-scrollbar-track {
    background: ${(props: any) => props.theme.layout};
    border: none;
  }

  @media only screen and (min-width: 769px) {
    .chat-list {
      border-right-color: ${(props: any) => props.theme.primaryBorderColor} !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .chat-list-cont {
      background: ${(props: any) => props.theme.primaryColor} !important;
      border-right-color: ${(props: any) => props.theme.primaryBorderColor} !important;

      & > .flex {
        border-right-color: ${(props: any) => props.theme.primaryBorderColor} !important;
      }
    }
  }
`;

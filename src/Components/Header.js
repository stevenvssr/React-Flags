import styled from "styled-components";

// --- New Component for Styling the word "Flags" ---
const FlagText = styled.span`
  /* Emphasize 'Flags' with the accent color and a bold/glowing effect */
  color: #ffb830; /* Your defined warning/accent color */
  font-weight: 800;
  font-size: 1.25em; /* Make it slightly larger than "Fun with" */
  letter-spacing: 2px;
  /* Optional: Add a subtle glow/shadow */
  text-shadow: 0 0 5px rgba(255, 184, 48, 0.5);
`;

const HeaderWrapper = styled.div`
  /* Darker background matching the gradient base, with a subtle border/shadow */
  background: #0c101d;
  color: #f0f0f0;
  padding: 20px 0; /* Increased padding */
  margin: 0;
  /* Stronger box shadow for a 'floating' effect */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
    inset 0 -2px 5px rgba(255, 255, 255, 0.05);
`;

const Title = styled.h1`
  /* Center text AND icon using Flexbox */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Increased space between text and icon */
  margin: 0;

  font-size: 2rem; /* Slightly adjusted base font size */
  font-weight: 500; /* Lighter base weight for contrast */
`;

export { HeaderWrapper, Title, FlagText };

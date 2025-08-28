// table.js

import { voices } from './voices.js';
import { renderVoice } from './voices.js';

// 🜁 Einzelne Zeile rendern
export function renderTableRow(data, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.username}</td>
    <td>${data.entry}</td>
    <td>${data.leverage}x</td>
    <td>${data.size}</td>
    <td>${data.liq}</td>
    <td>${data.pnl}</td>
    <td>${data.roi}%</td>
    <td>${data.time}</td>
    <td style="background-color:${data.direction === 'LONG' ? '#004d00' : '#660000'}; color:#fff;">
      ${data.direction}
    </td>
    <td>${getFlameSVG(data.roi, data.direction)}</td>
    <td><button onclick="deleteVoiceAndRender(${index})">❌</button></td>
  `;
  document.getElementById("voicesBody").appendChild(row);
}

// 🜂 Gesamte Tabelle neu rendern
export function renderTable() {
  document.getElementById("voiceContainer").innerHTML = "";
  document.getElementById("voicesBody").innerHTML = "";
  voices.forEach((v, i) => {
    renderVoice(v);
    renderTableRow(v, i);
  });
}

// 🜃 SVG-Flamme nach ROI und Richtung
export function getFlameSVG(roi, direction) {
  const color = direction === "LONG" ? "#00ff66" : "#ff0033";
  return `
    <svg class="flame" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        .pulse {
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
      <path class="pulse" fill="${color}" d="M12 2C10 6 6 8 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-5-4-7-6-11z"/>
    </svg>
  `;
}

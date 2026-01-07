import bali from "./bali";
import japan from "./japan";
import europ from "./europ";
import Australian from "./Australian";
import delhiHeritage from "./delhiHeritage";
import everest from "./everest";
import goa from "./goa";
import safari from "./safari";
import kashmir from "./kashmir";
import peru from "./peru";
import california from "./california";
import kerala from "./kerala";
import Rajasthan from "./Rajasthan";
import thai from "./thai";
import himachalItinerary from "./himachal";
import goldenTriangleItinerary from "./goldenTriangle";
import goaItinerary from "./goa2";
import northEastItinerary from "./northeast";
import varanasiItinerary from "./varanasi";
import andamanItinerary from "./andaman";
import swissAlpsItinerary from "./swissAlps";
import incaTrailItinerary from "./machuPichu";
import patagoniaItinerary from "./pantagonia";
import mountFujiItinerary from "./mountFuji";
import dolomitesItinerary from "./dolomites";
import rockyMountainsItinerary from "./rockeyMountains";
import kilimanjaroItinerary from "./kilimanjaro";
import annapurnaCircuitItinerary from "./annapurna";
import mountCookItinerary from "./mountcook";
import udaipurItinerary from "./udaipur";
import sikkimItinerary from "./sikkim";
import rishikeshItinerary from "./rishikesh";
import ladakhItinerary from "./ladakh";
import icelandRingRoadItinerary from "./iceland";
import santoriniItinerary from "./santorini";

/*
  RULE:
  - Keys MUST match `citySlug`
  - Keys MUST be lowercase
  - Keys MUST be stable (never change later)
*/

export const detailedItineraries = {
  // 🌍 International
  bali,
  europ,
  japan,
  australian: Australian,
  peru,
  thai,
  safari,
  california,
  swissalps: swissAlpsItinerary,
  everest,
  incatrail: incaTrailItinerary,
  patagonia: patagoniaItinerary,
  mountfuji: mountFujiItinerary,
  dolomites: dolomitesItinerary,
  rockymountains: rockyMountainsItinerary,
  kilimanjaro:kilimanjaroItinerary,
  annapurna: annapurnaCircuitItinerary,
  mountcook: mountCookItinerary,
  iceland: icelandRingRoadItinerary,
  santorini: santoriniItinerary,

  // 🇮🇳 India
  delhi: delhiHeritage,
  goa,
  kashmir,
  rajasthan: Rajasthan,
  kerala,
  himachal: himachalItinerary,
  goldentriangle: goldenTriangleItinerary,
  goabeach: goaItinerary,
  northeast: northEastItinerary,
  varanasi: varanasiItinerary,
  andaman: andamanItinerary,
  udaipur: udaipurItinerary,
  sikkim: sikkimItinerary,
  rishikesh: rishikeshItinerary,
  ladakh: ladakhItinerary,
};

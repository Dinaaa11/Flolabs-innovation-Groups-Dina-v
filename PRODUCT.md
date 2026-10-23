# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences matter equally:

- A person deciding whether to join FloLabs Innovations Group: they read the story, then apply or explore meetings.
- An existing participant catching up on meetings and the founder’s story.
- A partner, funder, or collaborator evaluating the group.

## Product Purpose

An about-and-story site for FloLabs Innovations Group, a FloLabs company focused on innovation in AI and robotics. The about narrative is the primary surface. Sunday meetings are a secondary library of real records. Success is that a visitor can understand who John Hazlewood is, why the group exists, and where to go next, without invented claims.

## Positioning

The site is the founder’s documented path (places, people, and programs he actually names) joined to a live meeting archive. A generic innovation landing page could not truthfully copy that biography or those meeting records.

## Operating Context

- Public marketing pages: home, about, conversations (meeting index and detail).
- Meetings come from the existing Strapi Sunday Tech Meeting collection. List views must not wait on the full transcript. Transcript and speakers load after paint from the meeting detail API.
- Theme is a user toggle (light and dark), stored in the browser.

## Capabilities and Constraints

- Confirmed routes: `/`, `/about`, `/conversations`, `/conversations/[id]`.
- Meeting fields that exist and may be shown: `meeting_title`, `meeting_date`, `meeting_link`, `meeting_summary`, `meeting_transcription`. Do not invent duration, speaker, series, or company fields.
- Do not mock Strapi. Do not print `STRAPI_API_TOKEN`.
- Browser tab title stays exactly `Flolabs innovation Group`.
- John’s biography, place names, and named people stay factual. Do not invent quotes, statistics, testimonials, or people.
- Copy may be tightened later only when asked. Names, places, and meeting data stay factual.
- App lives in `uploads/flolabs-library1`. Do not rename that folder.

## Brand Commitments

- Name: FloLabs Innovations Group. Parent: FloLabs.
- Founder named on the site: John Hazlewood, Founder, CEO and founding intern.
- Tab title, exact casing: `Flolabs innovation Group`.

## Evidence on Hand

- Live about copy, place photos, leadership photos, and news images under `uploads/flolabs-library1/public/about/`.
- Real meeting records only via Strapi at runtime. Do not bake meeting bodies or the API token into static files.
- Absences future work must not fabricate: testimonials, customer counts, pricing, licensing, benchmarks, and people who are not already named in the confirmed copy.

## Product Principles

- Story first. Meetings support the story; they do not lead the site.
- Facts only. Biography, places, and meetings stay tied to source material.
- Three audiences, one site. Prospects, participants, and partners share the same public pages.
- The archive is real. Empty or slow meeting data is shown as such, never filled with samples.

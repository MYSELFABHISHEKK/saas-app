import React from 'react';
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold mb-6">Popular Companions</h1>

            {/* Wrap cards in a grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <CompanionCard
                    id="123"
                    name="Neura the Brainly Explorer"
                    topic="Neural Network of the Brain"
                    subject="Science"
                    duration={45}
                    color="#ffda6e"
                />
                <CompanionCard
                    id="456"
                    name="Countsy the Number Wizard"
                    topic="Derivatives & Integrals"
                    subject="Maths"
                    duration={30}
                    color="#e5d0ff"
                />
                <CompanionCard
                    id="789"
                    name="Verba the Vocabulary Builder"
                    topic="language"
                    subject="English Literature"
                    duration={30}
                    color="#BDE7FF"
                />
            </section>

            <section className="home-section">
                <CompanionList
                    title="Recently completed sessions"
                    companions={recentSessions}
                    className="w-2/3 max-lg:w-full"
                />
                <CTA />
            </section>
        </main>
    );
};

export default Page;

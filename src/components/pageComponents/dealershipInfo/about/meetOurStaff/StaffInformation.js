"use client";
import { useState } from "react";

import StaffProfile from "./StaffProfile";
import staffProfiles from "@/data/staff";

const departments = [
    "All",
    "Management Department",
    "Parts Department",
    "Sales Department",
    "Service Department"
];


export default function StaffInformation() {
    const [selectedDept, setSelectedDept] = useState("All");

    const filteredProfiles =
        selectedDept === "All"
            ? staffProfiles
            : staffProfiles.filter((profile) => profile.department === selectedDept);

    return (
        <div className="section-container py-10 justify-items-center">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-6 items-center mb-8 ">
                {departments.map((dept) => (
                    <button
                        key={dept}
                        className={`px-6 py-2 rounded-full border text-base font-medium transition-all ${
                            selectedDept === dept
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedDept(dept)}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            {/* Staff Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 w-full mt-10">
                {filteredProfiles.map((profile, idx) => (
                    <StaffProfile
                        key={profile.title + idx}
                        image={profile.image}
                        title={profile.title}
                        subtitle={profile.subtitle}
                    />
                ))}
            </div>
        </div>
    );
}
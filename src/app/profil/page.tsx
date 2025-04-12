"use client"
import EditUserForm from "@/components/forms/editUserForm";
import EducationForm from "@/components/forms/educationForm";
import ExperienceForm from "@/components/forms/experienceForm";
import ProjectForm from "@/components/forms/projectForm";

export default function Profil() {
    return <div className="w-full text-gray-800">
        <div className="mt-3">
            <EditUserForm />
        </div>
        <div className="mt-3">
            <ExperienceForm />
        </div>
        <div className="mt-3">
            <EducationForm />
        </div>
        <div className="mt-3">
            <ProjectForm />
        </div>
    </div>
}
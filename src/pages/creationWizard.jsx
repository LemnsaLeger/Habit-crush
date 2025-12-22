import NewHabit from "../components/newHabit";
import HabitBasics from "../components/habitbasics";
import HabitTypeSelection from "../components/habitTypeSelection";
import HabitTargetInput from "../components/HabitTargetInput";
import HabitFrequencyConfigurator from "../components/configuration";
import MotivationSetup from "../components/motibvation";
import Dashboard from "../components/dashboard";

export default function CreationWizard() {
    return (
        <>
            <h1 className="creation-wizard-h1">creation Wizard</h1>
            <p className="creation-wizard-p">Step by habit construction</p>
            <NewHabit />
            <HabitBasics />
            <HabitTypeSelection />
            <HabitTargetInput />
            <HabitFrequencyConfigurator />
            <MotivationSetup />
            <Dashboard />
        </>
    )
}
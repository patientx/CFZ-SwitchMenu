import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "CFZ-SwitchMenu.OldMenuButton",
    async setup(app) {
        const menu = document.querySelector(".comfy-menu");
        
        // Add toggle menu button
        const switchMenuButton = document.createElement("button");
        switchMenuButton.id = "switchMenuButton";
        switchMenuButton.textContent = "Switch Menu";
        switchMenuButton.onclick = () => {
            try {
                const currentValue = app.extensionManager.setting.get("Comfy.UseNewMenu");
                const newValue = currentValue === "Disabled" ? "Top" : "Disabled";
                app.extensionManager.setting.set("Comfy.UseNewMenu", newValue);
            } catch (error) {
                console.error("Error switching menu:", error);
            }
        };
        
        menu.append(switchMenuButton);
    }
});

// Add toggle button to new menu
app.registerExtension({
    name: "CFZ-SwitchMenu.NewMenuButton",
    async setup(app) {
        if (app.menu) {
            const switchMenuButtonNew = document.createElement("button");
            switchMenuButtonNew.id = "switchMenuButtonNew";
            switchMenuButtonNew.textContent = "Switch Menu";
            switchMenuButtonNew.onclick = () => {
                try {
                    const currentValue = app.extensionManager.setting.get("Comfy.UseNewMenu");
                    const newValue = currentValue === "Disabled" ? "Top" : "Disabled";
                    app.extensionManager.setting.set("Comfy.UseNewMenu", newValue);
                } catch (error) {
                    console.error("Error switching menu:", error);
                }
            };
            
            // Add button to the menu before settings group
            if (app.menu.settingsGroup?.element?.parentElement) {
                app.menu.settingsGroup.element.parentElement.insertBefore(
                    switchMenuButtonNew,
                    app.menu.settingsGroup.element
                );
            }
        }
    }
});
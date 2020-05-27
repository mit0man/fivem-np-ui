Citizen.CreateThread(function()
    local pedId = GetPlayerPed(-1)
    SetEntityHealth(pedId, GetEntityMaxHealth(pedId))
    local health = GetEntityHealth(pedId)
    local maxHealth = GetEntityMaxHealth(pedId)

    SendNUIMessage({ health = health, maxHealth = maxHealth })

    while true do
    	Wait(0)
    	local newHealth = GetEntityHealth(pedId)
    	if not (newHealth == health) then
    		SendNUIMessage({ health = health, maxHealth = maxHealth })
    		health = newHealth
    	end
    	if IsEntityDead(pedId) then
    		SendNUIMessage({ health = 1, maxHealth = maxHealth })
    		break
    	end
    end
end)


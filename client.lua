local opened = false
local Promise = nil


function openMenu(options, cb1, cb2)
    if not info then return end
    opened = true
    SetNuiFocus(true, false)
    SendNUIMessage({
        type = 'open',
        info = options
    })
    local awaitPromise = Citizen.Await(Promise)
    if awaitPromise ~= 'closed' then
        cb(awaitPromise)
    else
        zb("")
    end
end

RegisterNUICallback("enter", function(data)
    opened = false
    Promise:resolve(data.value)
    Promise = nil
    SetNuiFocus(false, false)
end)


RegisterNUICallback('close', function()
    Promise:resolve('closed')
    Promise = nil
    SetNuiFocus(false, false)
    opened = false
end)

exports("openMenu", openMenu)
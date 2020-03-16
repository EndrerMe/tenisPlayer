// Vendors
import * as THREE from 'three';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TextureService {

    public clothes = new ReplaySubject();

    public getTextureShirt(): void {
        const loader = new THREE.TextureLoader();
        const shirtArray = [];
        const shortArray = [];
        const hairArray = [];

        let shirt, shirtIcon, short, shortIcon, hair, hairIcon;
        shirt = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_common/Common_shirt/Girl_shirt_01_com_03.png`);
shirtIcon = `./../../assets/2D/shirts/common/m_t_icons_locker_girl_shirts_common_01.png`
        shirt.flipY = false;
        shirtArray.push({
            shirt: shirt,
            shirtIcon: shirtIcon
        })

        shirt = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_common/Common_shirt/Girl_shirt_01_com_06.png`);
        shirtIcon = `./../../assets/2D/shirts/common/m_t_icons_locker_girl_shirts_common_13.png`
        shirt.flipY = false;
        shirtArray.push({
            shirt: shirt,
            shirtIcon: shirtIcon
        })

        shirt = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_common/Common_shirt/Girl_shirt_01_com_11.png`);
        shirtIcon = `./../../assets/2D/shirts/common/m_t_icons_locker_girl_shirts_common_2.png`
        shirt.flipY = false;
        shirtArray.push({
            shirt: shirt,
            shirtIcon: shirtIcon
        })

        shirt = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_common/Common_shirt/Girl_shirt_01_com_12.png`);
        shirtIcon = `./../../assets/2D/shirts/common/m_t_icons_locker_girl_shirts_common_4.png`
        shirt.flipY = false;
        shirtArray.push({
            shirt: shirt,
            shirtIcon: shirtIcon
        })

        shirt = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_common/Common_shirt/Girl_shirt_01_com_08.png`);
        shirtIcon = `./../../assets/2D/shirts/common/m_t_icons_locker_girl_shirts_common_16.png`
        shirt.flipY = false;
        shirtArray.push({
            shirt: shirt,
            shirtIcon: shirtIcon
        })

        hair = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_HairCut/_Girl_HairCut_01.png`);
        hair.flipY = false;
        hairArray.push({
            hair: hair,
            color: '#f15c13',
        })

        hair = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_HairCut/_Girl_HairCut_02.png`);
        hair.flipY = false;
        hairArray.push({
            hair: hair,
            color: '#4f1b02',
        })

        hair = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_HairCut/_Girl_HairCut_03.png`);
        hair.flipY = false;
        hairArray.push({
            hair: hair,
            color: '#252525',
        })


        for (let i = 1; i < 4; i++) {
            short = loader.load(`./../../../assets/3D/textures/Tennis_Girl_Textures
/Girl_premium/Premium_shorts/Girl_Short_2D_View0${i}.png`);
            shortIcon = `./../../assets/2D/shorts/m_t_icons_locker_girl_shorts_0${i}.png`
            short.flipY = false;
            shortArray.push({
                short: short,
                shortIcon: shortIcon
            })
        }
        
        this.clothes.next(
            {
                shirts: shirtArray,
                shorts: shortArray,
                hair: hairArray,
            }
        )
    }

}
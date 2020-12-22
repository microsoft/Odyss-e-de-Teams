import React, { useState } from "react";
import { withTranslation, Trans } from "react-i18next";
import i18n from '../../../../config/i18n';

import { Form, Button } from "react-bootstrap";

import "./style.scss";

const CGU = (props) => {
  const { t, onClickNext } = props;

  const isMobile = window.innerWidth < 768;

  const [CGUAccepted, setCGUAccepted] = useState(false);

  return (
    <div className="CGU d-flex flex-column align-items-center justify-content-center h-100 mx-auto">
      {isMobile && (
        <div className="CGU__logo">
          <img src={"/images/logo/" + i18n.language + "/logo_gauche_blanc.png"} alt="logo" className={"teams_logo"} />
        </div>
      )}
      <div className="CGU__container p-4 m-2 m-md-0">
        <div className="CGU__container__title mb-4">
          {t("landing.CGU.title")}
        </div>

        <div className="CGU__container__body mb-4">
          <Trans>
            <p>
              Nous accordons la plus grande importance à la confidentialité de vos
              informations. Cette déclaration de confidentialité explique quelles
              sont les données personnelles traitées par Microsoft, comment
              Microsoft les traite et à quelles fins.
          </p>
            <p>
              Microsoft propose une large gamme de produits, notamment des
              produits serveur utilisés pour faciliter le fonctionnement des
              entreprises du monde entier, les appareils que vous utilisez chez
              vous, les logiciels dont se servent les étudiants en cours et les
              services auxquels les développeurs font appel pour créer et héberger
              les produits du futur. Les références aux produits Microsoft dans
              cette déclaration comprennent les services, les sites web, les
              applications, les logiciels, les serveurs et les appareils
              Microsoft.
          </p>
            <p>
              Veuillez lire les détails spécifiques aux produits dans la présente
              déclaration de confidentialité pour plus de précisions. Cette
              déclaration s’applique aux interactions entre Microsoft et
              vous-même, aux produits Microsoft répertoriés ci-dessous, ainsi qu’à
              d’autres produits Microsoft entraînant l’affichage de cette
              déclaration.
          </p>
            <h4>Les données personnelles que nous recueillons</h4>
            <p>
              Microsoft recueille des données que vous lui fournissez dans le
              cadre de ses interactions avec vous et à travers ses produits. Vous
              fournissez certaines de ces informations directement et nous en
              obtenons d'autres en recueillant des données sur votre manière
              d'interagir avec nos produits, de les utiliser et de les apprécier.
              Les données recueillies varient selon le contexte de vos
              interactions avec Microsoft, les choix que vous effectuez (notamment
              concernant vos paramètres de confidentialité), les produits et les
              fonctionnalités que vous utilisez. Nous recueillons également des
              données vous concernant auprès de tiers.
          </p>
            <p>
              Si vous représentez une organisation (par exemple, une entreprise ou
              un établissement scolaire) qui utilise des produits pour entreprises
              et développeurs de Microsoft, consultez la section Produits pour
              entreprises et développeurs de la présente déclaration de
              confidentialité pour découvrir comment nous traitons vos données. Si
              vous êtes l’utilisateur final d’un produit Microsoft ou d’un compte
              Microsoft fourni par votre organisation, consultez les sections
              Produits fournis par votre organisation et Compte Microsoft pour
              plus d’informations.
          </p>
            <p>
              Vous pouvez décider des technologies que vous souhaitez utiliser et
              des données que vous souhaitez partager. Lorsque nous vous demandons
              de fournir des données personnelles, vous pouvez refuser. Toutefois,
              la plupart de nos produits nécessitent certaines données
              personnelles car elles nous permettent de vous offrir un service. Si
              vous choisissez de ne pas fournir les données requises qui nous
              permettent de vous proposer un produit ou une fonctionnalité, vous
              ne pourrez pas utiliser le produit ou la fonctionnalité en question.
              De même, si nous devons recueillir des données personnelles
              conformément à la loi ou pour conclure ou mener à bien un contrat
              avec vous, et que vous ne les fournissez pas, nous ne serons pas en
              mesure de conclure le contrat en question ; pour les mêmes raisons,
              si cela concerne un produit existant que vous utilisez, nous pouvons
              être amenés à suspendre ou annuler votre utilisation de ce dernier.
              Si tel est le cas, nous vous préviendrons le moment venu. Si la
              fourniture de données est facultative et que vous choisissez de ne
              pas partager vos données personnelles, vous ne pourrez pas accéder à
              certaines fonctionnalités qui les utilisent, comme par exemple la
              personnalisation qui ne fonctionnera pas pour vous.
          </p>
            <h4>Comment nous utilisons les données personnelles</h4>
            <p>
              Microsoft utilise les données recueillies dans le but de vous offrir
              des expériences riches et interactives. En particulier, nous
              utilisons les données pour :
          </p>
            <ul>
              <li>
                fournir nos produits, ce qui inclut la mise à jour, la
                sécurisation, la résolution des problèmes, ainsi que la fourniture
                du support ; cela comprend également le partage des données,
                lorsqu’il est nécessaire à la fourniture du service ou pour mener
                à bien les transactions que vous demandez ;
            </li>
              <li>améliorer et développer nos produits ;</li>
              <li>
                personnaliser nos produits et effectuer des recommandations ;
            </li>
              <li>
                vous adresser de la publicité et des communications marketing, ce
                qui comprend de vous envoyer des communications promotionnelles,
                des publicités ciblées et des présentations d'offres susceptibles
                de vous intéresser.
            </li>
            </ul>
            <p>
              Nous utilisons également les données pour mener nos activités,
              notamment pour analyser nos performances, nous conformer à nos
              obligations légales, développer nos méthodes de travail et effectuer
              des recherches.
          </p>
            <p>
              Pour ces finalités, nous combinons les données que nous recueillons
              dans différents contextes (par exemple, provenant de votre
              utilisation de deux produits Microsoft) ou que nous obtenons auprès
              de tiers pour vous donner une expérience plus homogène, cohérente et
              personnalisée, pour prendre des décisions avisées et à d’autres fins
              légitimes.
          </p>
            <p>
              Notre traitement de données personnelles à ces fins inclut à la fois
              des méthodes de traitement automatisées et manuelles (humaines). Nos
              méthodes automatisées sont souvent liées à nos méthodes manuelles et
              prises en charge par celles-ci. Par exemple, nos méthodes
              automatisées comprennent l’intelligence artificielle (IA), que nous
              considérons comme un ensemble de technologies qui permettent aux
              ordinateurs de percevoir, d’apprendre, de déduire et d’aider à
              prendre des décisions pour résoudre les problèmes de manière
              similaire à ce que les personnes font. Pour créer, former et
              améliorer la précision de nos méthodes de traitement automatisées
              (notamment l'IA), nous examinons manuellement certaines des
              prédictions et déductions produites par les méthodes automatisées
              par rapport aux données sous-jacentes à partir desquelles les
              prévisions et les déductions ont été effectuées. Par exemple, nous
              examinons manuellement les extraits de code courts d’un petit
              échantillon de données vocales. Nous avons suivi des étapes pour
              empêcher l'identification afin d'améliorer nos services vocaux, tels
              que la reconnaissance et la traduction.
          </p>
            <p>
              Raisons pour lesquelles nous partageons vos données personnelles
              Nous partageons vos données personnelles avec votre accord ou pour
              effectuer une transaction ou fournir un produit que vous avez
              demandé ou autorisé. Nous partageons également des données avec les
              filiales contrôlées par Microsoft ; avec les prestataires
              travaillant en notre nom ; lorsque cela est exigé par la loi ou pour
              répondre à une procédure judiciaire ; pour protéger nos clients ;
              pour protéger des vies humaines ; pour maintenir la sécurité de nos
              produits ; et pour protéger les droits et la propriété de Microsoft
              et de ses clients.
          </p>
            <h4>Comment accéder à et contrôler vos données personnelles</h4>
            <p>
              Vous pouvez également faire des choix quant à la collecte et à
              l’utilisation de vos données par Microsoft. Vous pouvez contrôler
              vos données personnelles obtenues par Microsoft et exercer vos
              droits en matière de protection des données, en contactant Microsoft
              ou en utilisant les différents outils que nous proposons. Dans
              certains cas, vos possibilités d'accéder à ou de contrôler vos
              données personnelles seront limitées, dans la mesure où la loi
              applicable l'exige ou le permet. La manière dont vous accédez à vos
              données personnelles ou dont vous les contrôlez dépend également des
              produits que vous utilisez. Vous pouvez par exemple :
          </p>
            <ul>
              <li>
                contrôler l’utilisation de vos données pour de la publicité par
                Microsoft axée sur vos centres d’intérêt en consultant notre page
                vous permettant d’exercer vos choix en matière de désabonnement ;
            </li>
              <li>
                choisir de recevoir ou non des courriers électroniques
                promotionnels, des messages SMS, des appels téléphoniques et du
                courrier postal de la part de Microsoft.
            </li>
              <li>
                Accédez à vos données et effacez-en certaines via le Tableau de
                bord de confidentialité Microsoft.
            </li>
            </ul>
            <p>
              Certaines données personnelles traitées par Microsoft ne sont pas
              accessibles ou ne peuvent pas être contrôlées via les outils
              ci-dessus. Si vous souhaitez accéder à et contrôler des données
              personnelles traitées par Microsoft qui ne sont pas disponibles via
              les outils ci-dessus ou directement par les produits Microsoft que
              vous utilisez, vous pouvez toujours contacter Microsoft à l'adresse
              indiquée dans la section Comment nous contacter ou en utilisant
              notre formulaire Web.
          </p>
            <p>
              Nous fournissons des mesures d'agrégat à propos des demandes des
              utilisateurs à exercer leurs droits de protection de leurs données
              via le Rapport de confidentialité Microsoft.
          </p>
            <h4>Cookies et technologies similaires</h4>
            <p>
              Les cookies sont de petits fichiers texte placés sur votre appareil
              permettant de stocker des données qui peuvent être rappelées par les
              serveurs web dans le domaine qui les ont placés. Nous utilisons des
              cookies et des technologies similaires pour stocker et respecter vos
              préférences et vos paramètres. Cela permet de vous connecter, de
              fournir de la publicité axée sur vos centres d’intérêt, de lutter
              contre la fraude, d'analyser les performances de nos produits et de
              remplir d’autres objectifs légitimes. Les applications Microsoft
              utilisent d’autres identifiants à des fins similaires, tels que
              l’identifiant de publicité dans Windows décrit dans la section
              Identifiant de publicité de la présente déclaration de
              confidentialité.
          </p>
            <p>
              Nous utilisons également des « balises web » pour nous aider à
              placer les cookies et à rassembler des données d’utilisation et de
              performance. Nos sites web peuvent inclure des balises web, des
              cookies et des technologies similaires de prestataires de services
              tiers.
          </p>
            <p>
              Vous disposez d’une variété d’outils pour contrôler les cookies, les
              balises web et les technologies similaires. Par exemple, vous pouvez
              utiliser les contrôles de votre navigateur Internet pour limiter
              l'utilisation des cookies par les sites Web que vous visitez et
              retirer votre consentement en supprimant ou en bloquant les cookies.
          </p>
            <h4>
              Produits fournis par votre organisation – avis destiné aux
              utilisateurs finaux
          </h4>
            <p>
              Si vous utilisez un produit Microsoft avec un compte fourni par une
              organisation à laquelle vous êtes affilié, par exemple, votre compte
              professionnel ou scolaire, cette organisation peut :
          </p>
            <ul>
              <li>
                Contrôler et administrer votre produit et votre compte de produit
                Microsoft, y compris contrôler les paramètres relatifs à la
                confidentialité du produit ou du compte de produit.
            </li>
              <li>
                Accéder à vos données et les traiter, notamment les données
                d’interaction, les données de diagnostic et les contenus de vos
                communications et fichiers associés à votre produit et à vos
                comptes de produits Microsoft.
            </li>
            </ul>
            <p>
              Si vous perdez l’accès à votre compte professionnel ou scolaire (en
              cas de changement d’activité, par exemple), vous risquez de perdre
              l’accès aux produits et au contenu associé à ces produits, y compris
              à ceux que vous avez acquis pour votre propre compte, si vous avez
              utilisé votre compte professionnel ou scolaire pour vous connecter à
              ces produits.
          </p>
            <p>
              De nombreux produits Microsoft sont conçus pour être utilisés par
              des organisations, telles que des entreprises ou des établissements
              scolaires. Consultez la section Produits pour entreprises et
              développeurs de la présente déclaration de confidentialité. Si votre
              organisation vous permet d'accéder aux produits Microsoft, votre
              utilisation des produits Microsoft est soumise aux politiques de
              votre organisation, le cas échéant. Vous devez envoyer vos demandes
              concernant la confidentialité, notamment les demandes pour exercer
              vos droits en matière de protection des données, à l’administrateur
              de votre organisation. Lorsque vous utilisez des fonctions sociales
              dans les produits Microsoft, d’autres utilisateurs de votre réseau
              peuvent voir une partie de votre activité. Pour en savoir plus sur
              les fonctions sociales et autres fonctionnalités, consultez la
              documentation ou l'aide relatives au produit Microsoft concerné.
              Microsoft n’est pas responsable des politiques ou des pratiques de
              confidentialité ou de sécurité de nos clients, qui peuvent différer
              de celles stipulées dans cette déclaration de confidentialité.
          </p>
            <p>
              Lorsque vous utilisez un produit Microsoft fourni par votre
              organisation, le traitement de vos données personnelles par
              Microsoft, dans le cadre de ce produit, est régi par un contrat
              établi entre Microsoft et votre organisation. Microsoft traite vos
              données personnelles pour mettre le produit à votre disposition et à
              celle de votre organisation et pour les opérations commerciales
              légitimes de Microsoft en rapport avec la mise à disposition du
              produit comme expliqué à la section Produits pour entreprises et
              développeurs. Comme indiqué ci-dessus, si vous avez des questions
              sur le traitement de vos données personnelles par Microsoft dans le
              cadre de l'offre de produits à votre organisation, contactez votre
              organisation. Si vous avez des questions sur les opérations
              commerciales légitimes de Microsoft en rapport avec l'offre de
              produits à votre organisation, veuillez contacter Microsoft comme
              expliqué à la section Comment nous contacter. Pour en savoir plus
              sur nos opérations commerciales légitimes, consultez la section
              Produits pour entreprises et développeurs.
          </p>
            <p>
              Pour les produits Microsoft fournis par votre école d'enseignement
              primaire et secondaire, y compris Microsoft 365 Éducation, Microsoft
              :
          </p>
            <ul>
              <li>
                ne collectera pas ou n'utilisera pas des données personnelles des
                étudiants au-delà de ce qui est nécessaire à des fins pédagogiques
                ou scolaires autorisées ;
            </li>
              <li>
                ne vendra pas ou ne louera pas des données personnelles des
                étudiants ;
            </li>
              <li>
                n’utilisera pas ou ne partagera pas les données personnelles des
                étudiants à des fins publicitaires ou commerciales, telles que le
                ciblage comportemental des publications auprès des étudiants ;
            </li>
              <li>
                ne créera pas de profil personnel d’un étudiant, autre que pour la
                prise en charge de l’éducation ou de l’école autorisée ou comme
                autorisé par le parent, le tuteur ou l’étudiant ayant l’âge
                approprié ; et
            </li>
              <li>
                exigera que nos fournisseurs avec lesquels des données
                personnelles des étudiants sont partagées afin de fournir le
                service pédagogique, le cas échéant, soient tenus d’implémenter
                ces mêmes engagements pour les données personnelles des étudiants.
            </li>
            </ul>
            <h4>compte Microsoft</h4>
            <p>
              Grâce à un compte Microsoft, vous pouvez vous connecter aux produits
              Microsoft, ainsi qu’aux services de partenaires choisis de
              Microsoft. Les données personnelles associées à votre compte
              Microsoft comprennent des identifiants, un nom et des coordonnées,
              les données de paiement, les données sur l'appareil et
              l'utilisation, vos contacts, des informations sur vos activités,
              ainsi que vos centres d'intérêt et vos favoris. La connexion à votre
              compte Microsoft permet de bénéficier d’une personnalisation et
              d’expériences cohérentes dans tous les produits et sur tous les
              appareils, d’utiliser le stockage des données dans le cloud,
              d’effectuer des paiements à l’aide des instruments de paiement
              enregistrés sur votre compte Microsoft et d’activer d’autres
              fonctionnalités.
          </p>
            <p>Il existe trois types de compte Microsoft :</p>
            <ul>
              <li>
                Lorsque vous créez votre propre compte Microsoft lié à votre
                adresse e-mail personnelle, nous appelons ce compte un compte
                Microsoft personnel.
            </li>
              <li>
                Lorsque vous ou votre organisation (par exemple, un employeur ou
                votre établissement scolaire) créez votre compte Microsoft lié à
                l'adresse e-mail qui vous a été fournie par cette organisation,
                nous appelons ce compte un compte professionnel ou scolaire.
            </li>
              <li>
                Lorsque vous ou votre fournisseur de services (par exemple, un
                fournisseur de services internet ou câblés) créez votre compte
                Microsoft lié à votre adresse e-mail avec le domaine de votre
                fournisseur de services, nous appelons ce compte un compte tiers.
            </li>
            </ul>
            <p>
              Si vous vous connectez à un service proposé par un tiers avec votre
              compte Microsoft, vous partagerez avec ce tiers les données du
              compte requises pour ce service.
          </p>
            <h4>Autres informations importantes sur la confidentialité</h4>
            <p>
              Vous trouverez ci-dessous des informations de confidentialité
              supplémentaires, telles que la façon dont nous sécurisons vos
              données, où vos données sont traitées et la durée pendant laquelle
              nous conservons vos données. Vous trouverez de plus amples
              informations sur Microsoft et sur notre engagement à protéger votre
              confidentialité sur Confidentialité Microsoft.
          </p>
            <h3>Détails propres au produit:</h3>
            <h4>Produits pour entreprises et développeurs</h4>
            <p>
              Les produits pour entreprises et développeurs sont des produits et
              des logiciels Microsoft principalement conçus et proposés pour être
              utilisés par les entreprises et les développeurs. Il s'agit
              notamment des produits suivants :
          </p>
            <ul>
              <li>
                Services cloud, dénommés Services en ligne dans les Conditions
                d’utilisation de Microsoft Online Services (OST), tels qu’Office
                365, Microsoft Azure, Microsoft Dynamics 365 et Microsoft Intune,
                pour lesquels une organisation (notre « client ») souscrit un
                contrat avec Microsoft (« Services d'entreprise en ligne »).
            </li>
              <li>
                Autres services cloud destinés aux entreprises et aux
                développeurs, tels que les services PlayFab et des outils tels que
                le Kit de compétences Cortana.
            </li>
              <li>
                Produits pour serveurs, développeurs et plateforme de cloud
                hybride, tels que Windows Server, SQL Server, Visual Studio et
                System Center, Azure Stack et des logiciels open source tels que
                les solutions Bot Framework (« logiciels pour entreprises et
                développeurs »).
            </li>
              <li>
                Appareils et matériel utilisés pour l’infrastructure de stockage,
                tels que StorSimple (« appareils pour entreprise »).
            </li>
              <li>
                Les services professionnels mentionnés dans les Conditions des
                services en ligne qui sont disponibles avec les Services
                d'entreprise en ligne, tels que les services d'intégration, les
                services de migration de données, les services de science des
                données, ou les services visant à compléter les fonctionnalités
                existantes des Services d'entreprise en ligne.
            </li>
            </ul>
            <p>
              <strong>
                En cas de conflit entre cette déclaration de confidentialité de
                Microsoft et les termes de tout contrat entre un client et
                Microsoft concernant des produits pour entreprises et
                développeurs, les termes de ce contrat prévaudront.
            </strong>
            </p>
            <p>
              <strong>
                Vous pouvez également en savoir plus sur les fonctionnalités et
                les paramètres de nos produits pour entreprises et développeurs,
                notamment sur les choix qui ont des conséquences sur la protection
                de vos données personnelles ou celles de vos utilisateurs finaux,
                dans la documentation des produits.
            </strong>
            </p>
            <p>
              Si l'un des termes ci-dessous n'est pas défini dans cette
              déclaration de confidentialité ou dans le document OST, les
              définitions figurent ci-dessous.
          </p>
            <p>
              Généralités. Lorsqu'un client essaie, achète, utilise des produits
              pour entreprises et pour développeurs ou s'y abonne ou lorsqu'il
              bénéficie d'une assistance ou de services professionnels pour ces
              produits, Microsoft reçoit vos données et collecte et génère des
              données pour assurer le service (y compris, améliorer, sécuriser et
              mettre à jour le service), mener nos opérations commerciales
              légitimes et communiquer avec le client. Par exemple :
          </p>
            <ul>
              <li>
                Lorsqu’un client contacte un commercial Microsoft, nous
                recueillons son nom, ses coordonnées et des informations sur son
                organisation pour assurer le bon déroulement de la communication.
            </li>
              <li>
                Lorsqu’un client interagit avec un professionnel du support
                Microsoft, nous recueillons des données sur l'appareil ou
                l'utilisation ou des rapports d’erreur pour diagnostiquer et
                résoudre des problèmes.
            </li>
              <li>
                Lorsqu’un client achète des produits, nous recueillons des données
                de contact et de paiement pour traiter le paiement.
            </li>
              <li>
                Lorsque Microsoft envoie des communications à un client, nous
                utilisons des données pour personnaliser le contenu des
                communications.
            </li>
              <li>
                Lorsqu'un client contacte Microsoft dans le cadre de services
                professionnels, nous recueillons le nom et les coordonnées du
                point de contact désigné du client et utilisons les informations
                fournies par le client pour accomplir les services demandés par
                celui-ci.
            </li>
            </ul>
            <p>
              Les produits pour entreprises et développeurs vous permettent
              d’acheter d’autres produits et services en ligne de Microsoft ou de
              tiers ayant des pratiques de confidentialité différentes, de vous y
              abonner ou de les utiliser. Ces autres produits et services en ligne
              sont régis par leurs déclarations et stratégies de confidentialité
              respectives.
          </p>
            <h4>Produits de productivité et de communications</h4>
            <p>
              Les produits de productivité et de communications sont des
              applications, des logiciels et des services que vous pouvez utiliser
              pour créer, stocker et partager des documents, mais aussi pour
              communiquer avec d’autres personnes.
          </p>
            <h4>Recherche, Microsoft Edge et intelligence artificielle</h4>
            <p>
              Les produits de recherche et d’intelligence artificielle mettent des
              informations à votre disposition et captent, traitent et agissent
              intelligemment sur la base de ces informations, tout en apprenant et
              en s’adaptant au fil du temps.
          </p>
            <h4>Windows</h4>
            <p>
              Windows est un environnement informatique personnalisé qui vous
              permet de parcourir et d’accéder sans problème à des services, des
              préférences et du contenu sur vos appareils informatiques, du
              téléphone au Surface Hub en passant par la tablette. Les composants
              clés de Windows ne résident pas simplement de façon statique sur
              votre appareil. Ils sont basés sur le cloud. Les éléments de Windows
              locaux et dans le cloud sont mis à jour régulièrement, vous
              fournissant ainsi les toutes dernières améliorations et
              fonctionnalités. Afin de vous fournir cette expérience informatique,
              nous recueillons des données sur vous, votre appareil, et votre
              manière d’utiliser Windows. Comme Windows vous est personnel, nous
              vous offrons des choix quant aux données personnelles que nous
              recueillons et notre manière de les utiliser. Remarque : si votre
              appareil Windows est géré par votre organisation (comme votre
              employeur ou votre établissement scolaire), celle-ci peut utiliser
              des outils de gestion centralisée fournis par Microsoft ou d’autres
              sociétés, afin de consulter et de traiter vos données, et de
              contrôler les réglages de l’appareil (y compris les paramètres de
              confidentialité), les stratégies de l’appareil, les mises à jour de
              logiciels, la collecte des données effectuée par nous ou
              l’organisation, ou d’autres aspects de votre appareil. En outre,
              votre organisation peut utiliser les outils de gestion fournis par
              Microsoft ou d’autres sociétés pour consulter et traiter vos données
              à partir de cet appareil, y compris vos données d’interaction, vos
              données de diagnostic et les contenus de vos communications et
              fichiers. Pour plus d’informations sur la collecte et la
              confidentialité des données dans Windows, consultez Windows 10 et
              vos services en ligne. Les versions antérieures de Windows
              (notamment Windows Vista, Windows 7, Windows 8 et Windows 8.1) sont
              soumises à leurs propres déclarations de confidentialité.
          </p>
            <h4>Services de divertissement et services associés</h4>
            <p>
              Les services de divertissement et services associés offrent de
              riches expériences et vous permettent d’accéder à une grande
              diversité de contenu, d'applications et de jeux.
          </p>
          </Trans>
        </div>

        <div className="CG__container__form">
          <Form className="CGU__container__form mb-0">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label={t("landing.CGU.acknowledge")}
                onChange={(e) => setCGUAccepted(!CGUAccepted)}
              />
            </Form.Group>

            {!isMobile && (
              <Button
                variant="primary"
                className="py-3 py-md-2"
                onClick={onClickNext}
                disabled={CGUAccepted === false}
              >
                {t("landing.CGU.buttonText")}
              </Button>
            )}
          </Form>
        </div>
      </div>
      {isMobile && (
        <div className="CGU__container__mobile--actions">
          <Button
            variant="primary"
            className="py-3 py-md-2 w-100"
            onClick={onClickNext}
            disabled={CGUAccepted === false}
          >
            {t("landing.CGU.buttonText")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default withTranslation()(CGU);

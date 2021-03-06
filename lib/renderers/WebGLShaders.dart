var __ShaderChunk;

get ShaderChunk  {
  if (__ShaderChunk == null) {
    __ShaderChunk = {
// FOG

  "fog_pars_fragment": Strings.join([

    "#ifdef USE_FOG",

      "uniform vec3 fogColor;",

      "#ifdef FOG_EXP2",

        "uniform float fogDensity;",

      "#else",

        "uniform float fogNear;",
        "uniform float fogFar;",

      "#endif",

    "#endif"

  ],"\n"),

  "fog_fragment": Strings.join([

    "#ifdef USE_FOG",

      "float depth = gl_FragCoord.z / gl_FragCoord.w;",

      "#ifdef FOG_EXP2",

        "const float LOG2 = 1.442695;",
        "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
        "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",

      "#else",

        "float fogFactor = smoothstep( fogNear, fogFar, depth );",

      "#endif",

      "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

    "#endif"

  ],"\n"),

  // ENVIRONMENT MAP

  "envmap_pars_fragment": Strings.join([

    "#ifdef USE_ENVMAP",

      "uniform float reflectivity;",
      "uniform samplerCube envMap;",
      "uniform float flipEnvMap;",
      "uniform int combine;",

      "#ifdef USE_BUMPMAP",

        "uniform bool useRefract;",
        "uniform float refractionRatio;",

      "#else",

        "varying vec3 vReflect;",

      "#endif",

    "#endif"

  ],"\n"),

  "envmap_fragment": Strings.join([

    "#ifdef USE_ENVMAP",

      "vec3 reflectVec;",

      "#ifdef USE_BUMPMAP",

        "vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );",

        "if ( useRefract ) {",

          "reflectVec = refract( cameraToVertex, normal, refractionRatio );",

        "} else { ",

          "reflectVec = reflect( cameraToVertex, normal );",

        "}",

      "#else",

        "reflectVec = vReflect;",

      "#endif",

      "#ifdef DOUBLE_SIDED",

        "float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );",
        "vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );",

      "#else",

        "vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );",

      "#endif",

      "#ifdef GAMMA_INPUT",

        "cubeColor.xyz *= cubeColor.xyz;",

      "#endif",

      "if ( combine == 1 ) {",

        "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );",

      "} else {",

        "gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );",

      "}",

    "#endif"

  ],"\n"),

  "envmap_pars_vertex": Strings.join([

    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP )",

      "varying vec3 vReflect;",

      "uniform float refractionRatio;",
      "uniform bool useRefract;",

    "#endif"

  ],"\n"),

  "envmap_vertex" : Strings.join([

    "#ifdef USE_ENVMAP",

      "vec4 mPosition = modelMatrix * vec4( position, 1.0 );",

    "#endif",

    "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP )",

      "vec3 nWorld = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * normal;",

      "if ( useRefract ) {",

        "vReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );",

      "} else {",

        "vReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );",

      "}",

    "#endif"

  ], "\n"),

  // COLOR MAP (particles)

  "map_particle_pars_fragment": Strings.join([

    "#ifdef USE_MAP",

      "uniform sampler2D map;",

    "#endif"

  ],"\n"),


  "map_particle_fragment": Strings.join([

    "#ifdef USE_MAP",

      "gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );",

    "#endif"

  ],"\n"),

  // COLOR MAP (triangles)

  "map_pars_vertex": Strings.join([

    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_SPECULARMAP )",

      "varying vec2 vUv;",
      "uniform vec4 offsetRepeat;",

    "#endif"

  ],"\n"),

  "map_pars_fragment": Strings.join([

    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_SPECULARMAP )",

      "varying vec2 vUv;",

    "#endif",

    "#ifdef USE_MAP",

      "uniform sampler2D map;",

    "#endif",

  ],"\n"),

  "map_vertex": Strings.join([

    "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_SPECULARMAP )",

      "vUv = uv * offsetRepeat.zw + offsetRepeat.xy;",

    "#endif"

  ],"\n"),

  "map_fragment": Strings.join([

    "#ifdef USE_MAP",

      "#ifdef GAMMA_INPUT",

        "vec4 texelColor = texture2D( map, vUv );",
        "texelColor.xyz *= texelColor.xyz;",

        "gl_FragColor = gl_FragColor * texelColor;",

      "#else",

        "gl_FragColor = gl_FragColor * texture2D( map, vUv );",

      "#endif",

    "#endif"

  ],"\n"),

  // LIGHT MAP

  "lightmap_pars_fragment": Strings.join([

    "#ifdef USE_LIGHTMAP",

      "varying vec2 vUv2;",
      "uniform sampler2D lightMap;",

    "#endif"

  ],"\n"),

  "lightmap_pars_vertex": Strings.join([

    "#ifdef USE_LIGHTMAP",

      "varying vec2 vUv2;",

    "#endif"

  ],"\n"),

  "lightmap_fragment": Strings.join([

    "#ifdef USE_LIGHTMAP",

      "gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );",

    "#endif"

  ],"\n"),

  "lightmap_vertex": Strings.join([

    "#ifdef USE_LIGHTMAP",

      "vUv2 = uv2;",

    "#endif"

  ],"\n"),

  // BUMP MAP

  "bumpmap_pars_fragment": Strings.join([

    "#ifdef USE_BUMPMAP",

      "uniform sampler2D bumpMap;",
      "uniform float bumpScale;",

      // Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen
      //  http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html

      // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

      "vec2 dHdxy_fwd() {",

        "vec2 dSTdx = dFdx( vUv );",
        "vec2 dSTdy = dFdy( vUv );",

        "float Hll = bumpScale * texture2D( bumpMap, vUv ).x;",
        "float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;",
        "float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;",

        "return vec2( dBx, dBy );",

      "}",

      "vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {",

        "vec3 vSigmaX = dFdx( surf_pos );",
        "vec3 vSigmaY = dFdy( surf_pos );",
        "vec3 vN = surf_norm;",   // normalized

        "vec3 R1 = cross( vSigmaY, vN );",
        "vec3 R2 = cross( vN, vSigmaX );",

        "float fDet = dot( vSigmaX, R1 );",

        "vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );",
        "return normalize( abs( fDet ) * surf_norm - vGrad );",

      "}",

    "#endif"

  ],"\n"),

  // SPECULAR MAP

  "specularmap_pars_fragment": Strings.join([

    "#ifdef USE_SPECULARMAP",

      "uniform sampler2D specularMap;",

    "#endif"

  ],"\n"),

  "specularmap_fragment": Strings.join([

    "float specularStrength;",

    "#ifdef USE_SPECULARMAP",

      "vec4 texelSpecular = texture2D( specularMap, vUv );",
      "specularStrength = texelSpecular.r;",

    "#else",

      "specularStrength = 1.0;",

    "#endif"

  ],"\n"),

  // LIGHTS LAMBERT

  "lights_lambert_pars_vertex": Strings.join([

    "uniform vec3 ambient;",
    "uniform vec3 diffuse;",
    "uniform vec3 emissive;",

    "uniform vec3 ambientLightColor;",

    "#if MAX_DIR_LIGHTS > 0",

      "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
      "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

    "#endif",

    "#if MAX_POINT_LIGHTS > 0",

      "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
      "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
      "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
      "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
      "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",

    "#endif",

    "#ifdef WRAP_AROUND",

      "uniform vec3 wrapRGB;",

    "#endif"

  ],"\n"),

  "lights_lambert_vertex": Strings.join([

    "vLightFront = vec3( 0.0 );",

    "#ifdef DOUBLE_SIDED",

      "vLightBack = vec3( 0.0 );",

    "#endif",

    "transformedNormal = normalize( transformedNormal );",

    "#if MAX_DIR_LIGHTS > 0",

    "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

      "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
      "vec3 dirVector = normalize( lDirection.xyz );",

      "float dotProduct = dot( transformedNormal, dirVector );",
      "vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

      "#ifdef DOUBLE_SIDED",

        "vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

        "#ifdef WRAP_AROUND",

          "vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

        "#endif",

      "#endif",

      "#ifdef WRAP_AROUND",

        "vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
        "directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );",

        "#ifdef DOUBLE_SIDED",

          "directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );",

        "#endif",

      "#endif",

      "vLightFront += directionalLightColor[ i ] * directionalLightWeighting;",

      "#ifdef DOUBLE_SIDED",

        "vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;",

      "#endif",

    "}",

    "#endif",

    "#if MAX_POINT_LIGHTS > 0",

      "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
        "vec3 lVector = lPosition.xyz - mvPosition.xyz;",

        "float lDistance = 1.0;",
        "if ( pointLightDistance[ i ] > 0.0 )",
          "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

        "lVector = normalize( lVector );",
        "float dotProduct = dot( transformedNormal, lVector );",

        "vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

        "#ifdef DOUBLE_SIDED",

          "vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

          "#ifdef WRAP_AROUND",

            "vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

          "#endif",

        "#endif",

        "#ifdef WRAP_AROUND",

          "vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
          "pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );",

          "#ifdef DOUBLE_SIDED",

            "pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );",

          "#endif",

        "#endif",

        "vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;",

        "#ifdef DOUBLE_SIDED",

          "vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;",

        "#endif",

      "}",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
        "vec3 lVector = lPosition.xyz - mvPosition.xyz;",

        "lVector = normalize( lVector );",

        "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );",

        "if ( spotEffect > spotLightAngle[ i ] ) {",

          "spotEffect = pow( spotEffect, spotLightExponent[ i ] );",

          "float lDistance = 1.0;",
          "if ( spotLightDistance[ i ] > 0.0 )",
            "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

          "float dotProduct = dot( transformedNormal, lVector );",
          "vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );",

          "#ifdef DOUBLE_SIDED",

            "vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

            "#ifdef WRAP_AROUND",

              "vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

            "#endif",

          "#endif",

          "#ifdef WRAP_AROUND",

            "vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
            "spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );",

            "#ifdef DOUBLE_SIDED",

              "spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );",

            "#endif",

          "#endif",

          "vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;",

          "#ifdef DOUBLE_SIDED",

            "vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;",

          "#endif",

        "}",

      "}",

    "#endif",

    "vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;",

    "#ifdef DOUBLE_SIDED",

      "vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;",

    "#endif"

  ],"\n"),

  // LIGHTS PHONG

  "lights_phong_pars_vertex": Strings.join([

    "#ifndef PHONG_PER_PIXEL",

    "#if MAX_POINT_LIGHTS > 0",

      "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
      "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

      "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

      "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];",

    "#endif",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

      "varying vec3 vWorldPosition;",

    "#endif"

  ],"\n"),


  "lights_phong_vertex": Strings.join([

    "#ifndef PHONG_PER_PIXEL",

    "#if MAX_POINT_LIGHTS > 0",

      "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
        "vec3 lVector = lPosition.xyz - mvPosition.xyz;",

        "float lDistance = 1.0;",
        "if ( pointLightDistance[ i ] > 0.0 )",
          "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

        "vPointLight[ i ] = vec4( lVector, lDistance );",

      "}",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
        "vec3 lVector = lPosition.xyz - mvPosition.xyz;",

        "float lDistance = 1.0;",
        "if ( spotLightDistance[ i ] > 0.0 )",
          "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

        "vSpotLight[ i ] = vec4( lVector, lDistance );",

      "}",

    "#endif",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

      "vWorldPosition = mPosition.xyz;",

    "#endif"

  ],"\n"),

  "lights_phong_pars_fragment": Strings.join([

    "uniform vec3 ambientLightColor;",

    "#if MAX_DIR_LIGHTS > 0",

      "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
      "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

    "#endif",

    "#if MAX_POINT_LIGHTS > 0",

      "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",

      "#ifdef PHONG_PER_PIXEL",

        "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
        "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

      "#else",

        "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

      "#endif",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
      "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
      "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];",
      "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",

      "#ifdef PHONG_PER_PIXEL",

        "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

      "#else",

        "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];",

      "#endif",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

      "varying vec3 vWorldPosition;",

    "#endif",

    "#ifdef WRAP_AROUND",

      "uniform vec3 wrapRGB;",

    "#endif",

    "varying vec3 vViewPosition;",
    "varying vec3 vNormal;"

  ],"\n"),

  "lights_phong_fragment": Strings.join([

    "vec3 normal = normalize( vNormal );",
    "vec3 viewPosition = normalize( vViewPosition );",

    "#ifdef DOUBLE_SIDED",

      "normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );",

    "#endif",

    "#ifdef USE_BUMPMAP",

      "normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );",

    "#endif",

    "#if MAX_POINT_LIGHTS > 0",

      "vec3 pointDiffuse  = vec3( 0.0 );",
      "vec3 pointSpecular = vec3( 0.0 );",

      "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

        "#ifdef PHONG_PER_PIXEL",

          "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
          "vec3 lVector = lPosition.xyz + vViewPosition.xyz;",

          "float lDistance = 1.0;",
          "if ( pointLightDistance[ i ] > 0.0 )",
            "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

          "lVector = normalize( lVector );",

        "#else",

          "vec3 lVector = normalize( vPointLight[ i ].xyz );",
          "float lDistance = vPointLight[ i ].w;",

        "#endif",

        // diffuse

        "float dotProduct = dot( normal, lVector );",

        "#ifdef WRAP_AROUND",

          "float pointDiffuseWeightFull = max( dotProduct, 0.0 );",
          "float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

          "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",

        "#else",

          "float pointDiffuseWeight = max( dotProduct, 0.0 );",

        "#endif",

        "pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;",

        // specular

        "vec3 pointHalfVector = normalize( lVector + viewPosition );",
        "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
        "float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );",

        "#ifdef PHYSICALLY_BASED_SHADING",

          // 2.0 => 2.0001 is hack to work around ANGLE bug

          "float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

          "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );",
          "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;",

        "#else",

          "pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;",

        "#endif",

      "}",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "vec3 spotDiffuse  = vec3( 0.0 );",
      "vec3 spotSpecular = vec3( 0.0 );",

      "for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

        "#ifdef PHONG_PER_PIXEL",

          "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
          "vec3 lVector = lPosition.xyz + vViewPosition.xyz;",

          "float lDistance = 1.0;",
          "if ( spotLightDistance[ i ] > 0.0 )",
            "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

          "lVector = normalize( lVector );",

        "#else",

          "vec3 lVector = normalize( vSpotLight[ i ].xyz );",
          "float lDistance = vSpotLight[ i ].w;",

        "#endif",

        "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

        "if ( spotEffect > spotLightAngle[ i ] ) {",

          "spotEffect = pow( spotEffect, spotLightExponent[ i ] );",

          // diffuse

          "float dotProduct = dot( normal, lVector );",

          "#ifdef WRAP_AROUND",

            "float spotDiffuseWeightFull = max( dotProduct, 0.0 );",
            "float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

            "vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );",

          "#else",

            "float spotDiffuseWeight = max( dotProduct, 0.0 );",

          "#endif",

          "spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;",

          // specular

          "vec3 spotHalfVector = normalize( lVector + viewPosition );",
          "float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );",
          "float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );",

          "#ifdef PHYSICALLY_BASED_SHADING",

            // 2.0 => 2.0001 is hack to work around ANGLE bug

            "float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

            "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );",
            "spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;",

          "#else",

            "spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;",

          "#endif",

        "}",

      "}",

    "#endif",

    "#if MAX_DIR_LIGHTS > 0",

      "vec3 dirDiffuse  = vec3( 0.0 );",
      "vec3 dirSpecular = vec3( 0.0 );" ,

      "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

        "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
        "vec3 dirVector = normalize( lDirection.xyz );",

        // diffuse

        "float dotProduct = dot( normal, dirVector );",

        "#ifdef WRAP_AROUND",

          "float dirDiffuseWeightFull = max( dotProduct, 0.0 );",
          "float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

          "vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );",

        "#else",

          "float dirDiffuseWeight = max( dotProduct, 0.0 );",

        "#endif",

        "dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;",

        // specular

        "vec3 dirHalfVector = normalize( dirVector + viewPosition );",
        "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
        "float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );",

        "#ifdef PHYSICALLY_BASED_SHADING",

          /*
          // fresnel term from skin shader
          "const float F0 = 0.128;",

          "float base = 1.0 - dot( viewPosition, dirHalfVector );",
          "float exponential = pow( base, 5.0 );",

          "float fresnel = exponential + F0 * ( 1.0 - exponential );",
          */

          /*
          // fresnel term from fresnel shader
          "const float mFresnelBias = 0.08;",
          "const float mFresnelScale = 0.3;",
          "const float mFresnelPower = 5.0;",

          "float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );",
          */

          // 2.0 => 2.0001 is hack to work around ANGLE bug

          "float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

          //"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;",

          "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
          "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",

        "#else",

          "dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;",

        "#endif",

      "}",

    "#endif",

    "vec3 totalDiffuse = vec3( 0.0 );",
    "vec3 totalSpecular = vec3( 0.0 );",

    "#if MAX_DIR_LIGHTS > 0",

      "totalDiffuse += dirDiffuse;",
      "totalSpecular += dirSpecular;",

    "#endif",

    "#if MAX_POINT_LIGHTS > 0",

      "totalDiffuse += pointDiffuse;",
      "totalSpecular += pointSpecular;",

    "#endif",

    "#if MAX_SPOT_LIGHTS > 0",

      "totalDiffuse += spotDiffuse;",
      "totalSpecular += spotSpecular;",

    "#endif",

    "#ifdef METAL",

      "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );",

    "#else",

      "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;",

    "#endif"

  ], "\n"),

  // VERTEX COLORS

  "color_pars_fragment": Strings.join([

    "#ifdef USE_COLOR",

      "varying vec3 vColor;",

    "#endif"

  ],"\n"),


  "color_fragment": Strings.join([

    "#ifdef USE_COLOR",

      "gl_FragColor = gl_FragColor * vec4( vColor, opacity );",

    "#endif"

  ],"\n"),

  "color_pars_vertex": Strings.join([

    "#ifdef USE_COLOR",

      "varying vec3 vColor;",

    "#endif"

  ],"\n"),


  "color_vertex": Strings.join([

    "#ifdef USE_COLOR",

      "#ifdef GAMMA_INPUT",

        "vColor = color * color;",

      "#else",

        "vColor = color;",

      "#endif",

    "#endif"

  ],"\n"),

  // SKINNING

  "skinning_pars_vertex": Strings.join([

    "#ifdef USE_SKINNING",

      "#ifdef BONE_TEXTURE",

        "uniform sampler2D boneTexture;",

        "mat4 getBoneMatrix( const in float i ) {",

          "float j = i * 4.0;",
          "float x = mod( j, N_BONE_PIXEL_X );",
          "float y = floor( j / N_BONE_PIXEL_X );",

          "const float dx = 1.0 / N_BONE_PIXEL_X;",
          "const float dy = 1.0 / N_BONE_PIXEL_Y;",

          "y = dy * ( y + 0.5 );",

          "vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );",
          "vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );",
          "vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );",
          "vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );",

          "mat4 bone = mat4( v1, v2, v3, v4 );",

          "return bone;",

        "}",

      "#else",

        "uniform mat4 boneGlobalMatrices[ MAX_BONES ];",

        "mat4 getBoneMatrix( const in float i ) {",

          "mat4 bone = boneGlobalMatrices[ int(i) ];",
          "return bone;",

        "}",

      "#endif",

    "#endif"

  ], "\n"),

  "skinbase_vertex": Strings.join([

    "#ifdef USE_SKINNING",

      "mat4 boneMatX = getBoneMatrix( skinIndex.x );",
      "mat4 boneMatY = getBoneMatrix( skinIndex.y );",

    "#endif"

  ],"\n"),

  "skinning_vertex": Strings.join([

    "#ifdef USE_SKINNING",

      "vec4 skinned  = boneMatX * skinVertexA * skinWeight.x;",
      "skinned    += boneMatY * skinVertexB * skinWeight.y;",

      "gl_Position  = projectionMatrix * modelViewMatrix * skinned;",

    "#endif"

  ],"\n"),

  // MORPHING

  "morphtarget_pars_vertex": Strings.join([

    "#ifdef USE_MORPHTARGETS",

      "#ifndef USE_MORPHNORMALS",

      "uniform float morphTargetInfluences[ 8 ];",

      "#else",

      "uniform float morphTargetInfluences[ 4 ];",

      "#endif",

    "#endif"

  ],"\n"),

  "morphtarget_vertex": Strings.join([

    "#ifdef USE_MORPHTARGETS",

      "vec3 morphed = vec3( 0.0 );",
      "morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];",
      "morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];",
      "morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];",
      "morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];",

      "#ifndef USE_MORPHNORMALS",

      "morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];",
      "morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];",
      "morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];",
      "morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];",

      "#endif",

      "morphed += position;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );",

    "#endif"

  ], "\n"),

  "default_vertex" : Strings.join([

    "#ifndef USE_MORPHTARGETS",
    "#ifndef USE_SKINNING",

      "gl_Position = projectionMatrix * mvPosition;",

    "#endif",
    "#endif"

  ],"\n"),

  "morphnormal_vertex": Strings.join([

    "#ifdef USE_MORPHNORMALS",

      "vec3 morphedNormal = vec3( 0.0 );",

      "morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];",
      "morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];",
      "morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];",
      "morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];",

      "morphedNormal += normal;",

    "#endif"

  ], "\n"),

  "skinnormal_vertex": Strings.join([

    "#ifdef USE_SKINNING",

      "mat4 skinMatrix = skinWeight.x * boneMatX;",
      "skinMatrix   += skinWeight.y * boneMatY;",

      "vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );",

    "#endif"

  ],"\n"),

  "defaultnormal_vertex": Strings.join([

    "vec3 transformedNormal;",

    "#ifdef USE_SKINNING",

      "transformedNormal = skinnedNormal.xyz;",

    "#endif",

    "#ifdef USE_MORPHNORMALS",

      "transformedNormal = morphedNormal;",

    "#endif",

    "#ifndef USE_MORPHNORMALS",
    "#ifndef USE_SKINNING",

      "transformedNormal = normal;",

    "#endif",
    "#endif",

    "transformedNormal = normalMatrix * transformedNormal;",

  ],"\n"),

  // SHADOW MAP

  // based on SpiderGL shadow map and Fabien Sanglard's GLSL shadow mapping examples
  //  http://spidergl.org/example.php?id=6
  //  http://fabiensanglard.net/shadowmapping

  "shadowmap_pars_fragment": Strings.join([

    "#ifdef USE_SHADOWMAP",

      "uniform sampler2D shadowMap[ MAX_SHADOWS ];",
      "uniform vec2 shadowMapSize[ MAX_SHADOWS ];",

      "uniform float shadowDarkness[ MAX_SHADOWS ];",
      "uniform float shadowBias[ MAX_SHADOWS ];",

      "varying vec4 vShadowCoord[ MAX_SHADOWS ];",

      "float unpackDepth( const in vec4 rgba_depth ) {",

        "const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );",
        "float depth = dot( rgba_depth, bit_shift );",
        "return depth;",

      "}",

    "#endif"

  ], "\n"),

  "shadowmap_fragment": Strings.join([

    "#ifdef USE_SHADOWMAP",

      "#ifdef SHADOWMAP_DEBUG",

        "vec3 frustumColors[3];",
        "frustumColors[0] = vec3( 1.0, 0.5, 0.0 );",
        "frustumColors[1] = vec3( 0.0, 1.0, 0.8 );",
        "frustumColors[2] = vec3( 0.0, 0.5, 1.0 );",

      "#endif",

      "#ifdef SHADOWMAP_CASCADE",

        "int inFrustumCount = 0;",

      "#endif",

      "float fDepth;",
      "vec3 shadowColor = vec3( 1.0 );",

      "for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

        "vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;",

        // "if ( something && something )"     breaks ATI OpenGL shader compiler
        // "if ( all( something, something ) )"  using this instead

        "bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );",
        "bool inFrustum = all( inFrustumVec );",

        // don't shadow pixels outside of light frustum
        // use just first frustum (for cascades)
        // don't shadow pixels behind far plane of light frustum

        "#ifdef SHADOWMAP_CASCADE",

          "inFrustumCount += int( inFrustum );",
          "bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );",

        "#else",

          "bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );",

        "#endif",

        "bool frustumTest = all( frustumTestVec );",

        "if ( frustumTest ) {",

          "shadowCoord.z += shadowBias[ i ];",

          "#ifdef SHADOWMAP_SOFT",

            // Percentage-close filtering
            // (9 pixel kernel)
            // http://fabiensanglard.net/shadowmappingPCF/

            "float shadow = 0.0;",

            /*
            // nested loops breaks shader compiler / validator on some ATI cards when using OpenGL
            // must enroll loop manually

            "for ( float y = -1.25; y <= 1.25; y += 1.25 )",
              "for ( float x = -1.25; x <= 1.25; x += 1.25 ) {",

                "vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );",

                // doesn't seem to produce any noticeable visual difference compared to simple "texture2D" lookup
                //"vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );",

                "float fDepth = unpackDepth( rgbaDepth );",

                "if ( fDepth < shadowCoord.z )",
                  "shadow += 1.0;",

            "}",

            "shadow /= 9.0;",

            */

            "const float shadowDelta = 1.0 / 9.0;",

            "float xPixelOffset = 1.0 / shadowMapSize[ i ].x;",
            "float yPixelOffset = 1.0 / shadowMapSize[ i ].y;",

            "float dx0 = -1.25 * xPixelOffset;",
            "float dy0 = -1.25 * yPixelOffset;",
            "float dx1 = 1.25 * xPixelOffset;",
            "float dy1 = 1.25 * yPixelOffset;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );",
            "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

            "shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );",

          "#else",

            "vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );",
            "float fDepth = unpackDepth( rgbaDepth );",

            "if ( fDepth < shadowCoord.z )",

              // spot with multiple shadows is darker

              "shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );",

              // spot with multiple shadows has the same color as single shadow spot

              //"shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );",

          "#endif",

        "}",


        "#ifdef SHADOWMAP_DEBUG",

          "#ifdef SHADOWMAP_CASCADE",

            "if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];",

          "#else",

            "if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];",

          "#endif",

        "#endif",

      "}",

      "#ifdef GAMMA_OUTPUT",

        "shadowColor *= shadowColor;",

      "#endif",

      "gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;",

    "#endif"

  ], "\n"),

  "shadowmap_pars_vertex": Strings.join([

    "#ifdef USE_SHADOWMAP",

      "varying vec4 vShadowCoord[ MAX_SHADOWS ];",
      "uniform mat4 shadowMatrix[ MAX_SHADOWS ];",

    "#endif"

  ],"\n"),

  "shadowmap_vertex": Strings.join([

    "#ifdef USE_SHADOWMAP",

      "vec4 transformedPosition;",

      "#ifdef USE_MORPHTARGETS",

        "transformedPosition = modelMatrix * vec4( morphed, 1.0 );",

      "#else",
      "#ifdef USE_SKINNING",

        "transformedPosition = modelMatrix * skinned;",

      "#else",

        "transformedPosition = modelMatrix * vec4( position, 1.0 );",

      "#endif",
      "#endif",

      "for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

        "vShadowCoord[ i ] = shadowMatrix[ i ] * transformedPosition;",

      "}",

    "#endif"

  ], "\n"),

  // ALPHATEST

  "alphatest_fragment": Strings.join([

    "#ifdef ALPHATEST",

      "if ( gl_FragColor.a < ALPHATEST ) discard;",

    "#endif"

  ],"\n"),

  // LINEAR SPACE

  "linear_to_gamma_fragment": Strings.join([

    "#ifdef GAMMA_OUTPUT",

      "gl_FragColor.xyz = sqrt( gl_FragColor.xyz );",

    "#endif"

  ],"\n"),
};
  }
  return __ShaderChunk;
}

class UniformsUtils {

  static merge ( uniforms ) {

    var u, p, tmp, merged = {};

    for ( u = 0; u < uniforms.length; u++ ) {

      tmp = UniformsUtils.clone( uniforms[ u ] );

      tmp.forEach((k, _) {

        merged[ k ] = tmp[ k ];

      });

    }

    return merged;

  }

  static clone( uniforms_src ) {

    var u, p, parameter, parameter_src, uniforms_dst = {};

    uniforms_src.forEach( ( k, u ) {

      var parameter_src = u.value;
      var parameter_dst;
      
      if ( parameter_src is Color ||
          parameter_src is Vector2 ||
          parameter_src is Vector3 ||
          parameter_src is Vector4 ||
          parameter_src is Matrix4 ||
          parameter_src is Texture ) {

        parameter_dst = parameter_src.clone();

      } else if ( parameter_src is List ) {

        parameter_dst = new List.from(parameter_src);

      } else {

        parameter_dst = parameter_src;

      }
      
      uniforms_dst[ k ] = new Uniform( type: u.type, value: parameter_dst, texture: u.texture);

    });

    return uniforms_dst;

  }

}

class Uniform {
  String type;
  var value;
  var texture;
  Uniform([this.type, this.value, this.texture]);
}

var __UniformsLib;

get UniformsLib {
  if (__UniformsLib == null) {
    __UniformsLib = {
  "common": {

    "diffuse" : new Uniform( type: "c", value: new Color( 0xeeeeee ) ),
    "opacity" : new Uniform( type: "f", value: 1.0 ),

    "map" : new Uniform( type: "t", value: 0, texture: null ),
    "offsetRepeat" : new Uniform( type: "v4", value: new Vector4( 0, 0, 1, 1 ) ),

    "lightMap" : new Uniform( type: "t", value: 2, texture: null ),
    "specularMap" : new Uniform( type: "t", value: 3, texture: null ),

    "envMap" : new Uniform( type: "t", value: 1, texture: null ),
    "flipEnvMap" : new Uniform( type: "f", value: -1 ),
    "useRefract" : new Uniform( type: "i", value: 0 ),
    "reflectivity" : new Uniform( type: "f", value: 1.0 ),
    "refractionRatio" : new Uniform( type: "f", value: 0.98 ),
    "combine" : new Uniform( type: "i", value: 0 ),

    "morphTargetInfluences" : new Uniform( type: "f", value: 0 )

  },

  "bump": {

    "bumpMap" : new Uniform( type: "t", value: 4, texture: null ),
    "bumpScale" : new Uniform( type: "f", value: 1 )

  },

  "fog" : {

    "fogDensity" : new Uniform( type: "f", value: 0.00025 ),
    "fogNear" : new Uniform( type: "f", value: 1 ),
    "fogFar" : new Uniform( type: "f", value: 2000 ),
    "fogColor" : new Uniform( type: "c", value: new Color( 0xffffff ) )

  },

  "lights": {

    "ambientLightColor" : new Uniform( type: "fv", value: [] ),

    "directionalLightDirection" : new Uniform( type: "fv", value: [] ),
    "directionalLightColor" : new Uniform( type: "fv", value: [] ),

    "pointLightColor" : new Uniform( type: "fv", value: [] ),
    "pointLightPosition" : new Uniform( type: "fv", value: [] ),
    "pointLightDistance" : new Uniform( type: "fv1", value: [] ),

    "spotLightColor" : new Uniform( type: "fv", value: [] ),
    "spotLightPosition" : new Uniform( type: "fv", value: [] ),
    "spotLightDirection" : new Uniform( type: "fv", value: [] ),
    "spotLightDistance" : new Uniform( type: "fv1", value: [] ),
    "spotLightAngle" : new Uniform( type: "fv1", value: [] ),
    "spotLightExponent" : new Uniform( type: "fv1", value: [] )

  },

  "particle": {

    "psColor" : new Uniform( type: "c", value: new Color( 0xeeeeee ) ),
    "opacity" : new Uniform( type: "f", value: 1.0 ),
    "size" : new Uniform( type: "f", value: 1.0 ),
    "scale" : new Uniform( type: "f", value: 1.0 ),
    "map" : new Uniform( type: "t", value: 0, texture: null ),

    "fogDensity" : new Uniform( type: "f", value: 0.00025 ),
    "fogNear" : new Uniform( type: "f", value: 1 ),
    "fogFar" : new Uniform( type: "f", value: 2000 ),
    "fogColor" : new Uniform( type: "c", value: new Color( 0xffffff ) )

  },

  "shadowmap": {

    "shadowMap": new Uniform( type: "tv", value: 6, texture: [] ),
    "shadowMapSize": new Uniform( type: "v2v", value: [] ),

    "shadowBias" : new Uniform( type: "fv1", value: [] ),
    "shadowDarkness": new Uniform( type: "fv1", value: [] ),

    "shadowMatrix" : new Uniform( type: "m4v", value: [] ),

  }
};
}
return __UniformsLib;
}


var __ShaderLib;

get ShaderLib  {
  if (__ShaderLib == null) {
    __ShaderLib = {

'depth': {

    'uniforms': {

      "mNear": new Uniform( type: "f", value: 1.0 ),
      "mFar" :  new Uniform( type: "f", value: 2000.0 ),
      "opacity" :  new Uniform( type: "f", value: 1.0 )

    },

    'vertexShader': Strings.join([

      "void main() {",

        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "uniform float mNear;",
      "uniform float mFar;",
      "uniform float opacity;",

      "void main() {",

        "float depth = gl_FragCoord.z / gl_FragCoord.w;",
        "float color = 1.0 - smoothstep( mNear, mFar, depth );",
        "gl_FragColor = vec4( vec3( color ), opacity );",

      "}"

    ], "\n")

  },

'normal': {

    'uniforms': {

      "opacity" : new Uniform( type: "f", value: 1.0 )

    },

    'vertexShader': Strings.join([

      "varying vec3 vNormal;",

      "void main() {",

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        "vNormal = normalMatrix * normal;",

        "gl_Position = projectionMatrix * mvPosition;",

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "uniform float opacity;",
      "varying vec3 vNormal;",

      "void main() {",

        "gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",

      "}"

    ], "\n")

  },

'basic': {
  'uniforms': UniformsUtils.merge( [UniformsLib[ "common" ],
                                    UniformsLib[ "fog" ],
                                    UniformsLib[ "shadowmap" ]] ),

  'vertexShader': Strings.join([

                 ShaderChunk[ "map_pars_vertex" ],
                 ShaderChunk[ "lightmap_pars_vertex" ],
                 ShaderChunk[ "envmap_pars_vertex" ],
                 ShaderChunk[ "color_pars_vertex" ],
                 ShaderChunk[ "skinning_pars_vertex" ],
                 ShaderChunk[ "morphtarget_pars_vertex" ],
                 ShaderChunk[ "shadowmap_pars_vertex" ],

                 "void main() {",

                 "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

                 ShaderChunk[ "map_vertex" ],
                 ShaderChunk[ "lightmap_vertex" ],
                 ShaderChunk[ "envmap_vertex" ],
                 ShaderChunk[ "color_vertex" ],
                 ShaderChunk[ "skinbase_vertex" ],
                 ShaderChunk[ "skinning_vertex" ],
                 ShaderChunk[ "morphtarget_vertex" ],
                 ShaderChunk[ "default_vertex" ],
                ShaderChunk[ "shadowmap_vertex" ],

                 "}"

                 ], "\n"),

   'fragmentShader': Strings.join([

                    "uniform vec3 diffuse;",
                    "uniform float opacity;",

                    ShaderChunk[ "color_pars_fragment" ],
                    ShaderChunk[ "map_pars_fragment" ],
                    ShaderChunk[ "lightmap_pars_fragment" ],
                    ShaderChunk[ "envmap_pars_fragment" ],
                    ShaderChunk[ "fog_pars_fragment" ],
                    ShaderChunk[ "shadowmap_pars_fragment" ],
                    ShaderChunk[ "specularmap_pars_fragment" ],

                    "void main() {",

                    "gl_FragColor = vec4( diffuse, opacity );",

                    ShaderChunk[ "map_fragment" ],
                    ShaderChunk[ "alphatest_fragment" ],
                    ShaderChunk[ "specularmap_fragment" ],
                    ShaderChunk[ "lightmap_fragment" ],
                    ShaderChunk[ "color_fragment" ],
                    ShaderChunk[ "envmap_fragment" ],
                    ShaderChunk[ "shadowmap_fragment" ],

                    ShaderChunk[ "linear_to_gamma_fragment" ],

                    ShaderChunk[ "fog_fragment" ],

                    "}"

                    ],"\n")

  },

  'lambert': {

    'uniforms': UniformsUtils.merge( [

      UniformsLib[ "common" ],
      UniformsLib[ "fog" ],
      UniformsLib[ "lights" ],
      UniformsLib[ "shadowmap" ],

      {
        "ambient"  : new Uniform( type: "c", value: new Color( 0xffffff ) ),
        "emissive" : new Uniform( type: "c", value: new Color( 0x000000 ) ),
        "wrapRGB"  : new Uniform( type: "v3", value: new Vector3( 1, 1, 1 ) )
      }

    ] ),

    'vertexShader': Strings.join([

      "varying vec3 vLightFront;",

      "#ifdef DOUBLE_SIDED",

        "varying vec3 vLightBack;",

      "#endif",

      ShaderChunk[ "map_pars_vertex" ],
      ShaderChunk[ "lightmap_pars_vertex" ],
      ShaderChunk[ "envmap_pars_vertex" ],
      ShaderChunk[ "lights_lambert_pars_vertex" ],
      ShaderChunk[ "color_pars_vertex" ],
      ShaderChunk[ "skinning_pars_vertex" ],
      ShaderChunk[ "morphtarget_pars_vertex" ],
      ShaderChunk[ "shadowmap_pars_vertex" ],

      "void main() {",

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

        ShaderChunk[ "map_vertex" ],
        ShaderChunk[ "lightmap_vertex" ],
        ShaderChunk[ "envmap_vertex" ],
        ShaderChunk[ "color_vertex" ],

        ShaderChunk[ "morphnormal_vertex" ],
        ShaderChunk[ "skinbase_vertex" ],
        ShaderChunk[ "skinnormal_vertex" ],
        ShaderChunk[ "defaultnormal_vertex" ],

        "#ifndef USE_ENVMAP",

          "vec4 mPosition = modelMatrix * vec4( position, 1.0 );",

        "#endif",

        ShaderChunk[ "lights_lambert_vertex" ],
        ShaderChunk[ "skinning_vertex" ],
        ShaderChunk[ "morphtarget_vertex" ],
        ShaderChunk[ "default_vertex" ],
        ShaderChunk[ "shadowmap_vertex" ],

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "uniform float opacity;",

      "varying vec3 vLightFront;",

      "#ifdef DOUBLE_SIDED",

        "varying vec3 vLightBack;",

      "#endif",

      ShaderChunk[ "color_pars_fragment" ],
      ShaderChunk[ "map_pars_fragment" ],
      ShaderChunk[ "lightmap_pars_fragment" ],
      ShaderChunk[ "envmap_pars_fragment" ],
      ShaderChunk[ "fog_pars_fragment" ],
      ShaderChunk[ "shadowmap_pars_fragment" ],
      ShaderChunk[ "specularmap_pars_fragment" ],

      "void main() {",

        "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

        ShaderChunk[ "map_fragment" ],
        ShaderChunk[ "alphatest_fragment" ],
        ShaderChunk[ "specularmap_fragment" ],

        "#ifdef DOUBLE_SIDED",

          //"float isFront = float( gl_FrontFacing );",
          //"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",

          "if ( gl_FrontFacing )",
            "gl_FragColor.xyz *= vLightFront;",
          "else",
            "gl_FragColor.xyz *= vLightBack;",

        "#else",

          "gl_FragColor.xyz *= vLightFront;",

        "#endif",

        ShaderChunk[ "lightmap_fragment" ],
        ShaderChunk[ "color_fragment" ],
        ShaderChunk[ "envmap_fragment" ],
        ShaderChunk[ "shadowmap_fragment" ],

        ShaderChunk[ "linear_to_gamma_fragment" ],

        ShaderChunk[ "fog_fragment" ],

      "}"

    ], "\n")

  },

  'phong': {

    'uniforms': UniformsUtils.merge( [

      UniformsLib[ "common" ],
      UniformsLib[ "bump" ],
      UniformsLib[ "fog" ],
      UniformsLib[ "lights" ],
      UniformsLib[ "shadowmap" ],

      {
        "ambient"  : new Uniform( type: "c", value: new Color( 0xffffff ) ),
        "emissive" : new Uniform( type: "c", value: new Color( 0x000000 ) ),
        "specular" : new Uniform( type: "c", value: new Color( 0x111111 ) ),
        "shininess": new Uniform( type: "f", value: 30 ),
        "wrapRGB"  : new Uniform( type: "v3", value: new Vector3( 1, 1, 1 ) )
      }

    ] ),

    'vertexShader': Strings.join([

      "varying vec3 vViewPosition;",
      "varying vec3 vNormal;",

      ShaderChunk[ "map_pars_vertex" ],
      ShaderChunk[ "lightmap_pars_vertex" ],
      ShaderChunk[ "envmap_pars_vertex" ],
      ShaderChunk[ "lights_phong_pars_vertex" ],
      ShaderChunk[ "color_pars_vertex" ],
      ShaderChunk[ "skinning_pars_vertex" ],
      ShaderChunk[ "morphtarget_pars_vertex" ],
      ShaderChunk[ "shadowmap_pars_vertex" ],

      "void main() {",

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

        ShaderChunk[ "map_vertex" ],
        ShaderChunk[ "lightmap_vertex" ],
        ShaderChunk[ "envmap_vertex" ],
        ShaderChunk[ "color_vertex" ],

        "#ifndef USE_ENVMAP",

          "vec4 mPosition = modelMatrix * vec4( position, 1.0 );",

        "#endif",

        "vViewPosition = -mvPosition.xyz;",

        ShaderChunk[ "morphnormal_vertex" ],
        ShaderChunk[ "skinbase_vertex" ],
        ShaderChunk[ "skinnormal_vertex" ],
        ShaderChunk[ "defaultnormal_vertex" ],

        "vNormal = transformedNormal;",

        ShaderChunk[ "lights_phong_vertex" ],
        ShaderChunk[ "skinning_vertex" ],
        ShaderChunk[ "morphtarget_vertex" ],
        ShaderChunk[ "default_vertex" ],
        ShaderChunk[ "shadowmap_vertex" ],

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "uniform vec3 diffuse;",
      "uniform float opacity;",

      "uniform vec3 ambient;",
      "uniform vec3 emissive;",
      "uniform vec3 specular;",
      "uniform float shininess;",

      ShaderChunk[ "color_pars_fragment" ],
      ShaderChunk[ "map_pars_fragment" ],
      ShaderChunk[ "lightmap_pars_fragment" ],
      ShaderChunk[ "envmap_pars_fragment" ],
      ShaderChunk[ "fog_pars_fragment" ],
      ShaderChunk[ "lights_phong_pars_fragment" ],
      ShaderChunk[ "shadowmap_pars_fragment" ],
      ShaderChunk[ "bumpmap_pars_fragment" ],
      ShaderChunk[ "specularmap_pars_fragment" ],

      "void main() {",

        "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

        ShaderChunk[ "map_fragment" ],
        ShaderChunk[ "alphatest_fragment" ],
        ShaderChunk[ "specularmap_fragment" ],

        ShaderChunk[ "lights_phong_fragment" ],

        ShaderChunk[ "lightmap_fragment" ],
        ShaderChunk[ "color_fragment" ],
        ShaderChunk[ "envmap_fragment" ],
        ShaderChunk[ "shadowmap_fragment" ],

        ShaderChunk[ "linear_to_gamma_fragment" ],

        ShaderChunk[ "fog_fragment" ],

      "}"

    ], "\n")

  },

  'particle_basic': {

    'uniforms':  UniformsUtils.merge( [

      UniformsLib[ "particle" ],
      UniformsLib[ "shadowmap" ]

    ] ),

    'vertexShader': Strings.join([

      "uniform float size;",
      "uniform float scale;",

      ShaderChunk[ "color_pars_vertex" ],
      ShaderChunk[ "shadowmap_pars_vertex" ],

      "void main() {",

        ShaderChunk[ "color_vertex" ],

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

        "#ifdef USE_SIZEATTENUATION",
          "gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
        "#else",
          "gl_PointSize = size;",
        "#endif",

        "gl_Position = projectionMatrix * mvPosition;",

        ShaderChunk[ "shadowmap_vertex" ],

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "uniform vec3 psColor;",
      "uniform float opacity;",

      ShaderChunk[ "color_pars_fragment" ],
      ShaderChunk[ "map_particle_pars_fragment" ],
      ShaderChunk[ "fog_pars_fragment" ],
      ShaderChunk[ "shadowmap_pars_fragment" ],

      "void main() {",

        "gl_FragColor = vec4( psColor, opacity );",

        ShaderChunk[ "map_particle_fragment" ],
        ShaderChunk[ "alphatest_fragment" ],
        ShaderChunk[ "color_fragment" ],
        ShaderChunk[ "shadowmap_fragment" ],
        ShaderChunk[ "fog_fragment" ],

      "}"

    ], "\n")

  },

  // Depth encoding into RGBA texture
  //  based on SpiderGL shadow map example
  //    http://spidergl.org/example.php?id=6
  //  originally from
  //    http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
  //  see also here:
  //    http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/

  'depthRGBA': {

    'uniforms': {},

    'vertexShader': Strings.join([

      ShaderChunk[ "skinning_pars_vertex" ],
      ShaderChunk[ "morphtarget_pars_vertex" ],

      "void main() {",

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

        ShaderChunk[ "skinbase_vertex" ],
        ShaderChunk[ "skinning_vertex" ],
        ShaderChunk[ "morphtarget_vertex" ],
        ShaderChunk[ "default_vertex" ],

      "}"

    ], "\n"),

    'fragmentShader': Strings.join([

      "vec4 pack_depth( const in float depth ) {",

        "const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
        "const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
        "vec4 res = fract( depth * bit_shift );",
        "res -= res.xxyz * bit_mask;",
        "return res;",

      "}",

      "void main() {",

        "gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

        //"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
        //"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
        //"gl_FragData[ 0 ] = pack_depth( z );",
        //"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",

      "}"

    ], "\n")

  }

    };
  }
  return __ShaderLib;
}
